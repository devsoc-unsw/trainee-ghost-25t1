const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");
const teamModel = require("../models/teamModel");
const pokeServices = require("../services/pokeServices");
const { sqlColumns } = require("../constants/sqlColumns");
const voting = require("../constants/voting");
const queryParams = require("../constants/queryParams");

/**
 * Retrieves task data specific to a user based on query parameters
 *
 * @param {number} userId - The ID of the user requesting thh task data
 * @param {Object} queryParams  - The parameters for determining what task data
 * to retrieve
 *
 * @returns {Promise<Object[]} A promise that resolves to an array of task objs
 */

const getTaskData = async (userId, queryParams) => {
  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  // A user not being a team is not necessarily an error, it just means they
  // won't have any tasks. Early return if this occurs
  if (!teamId) {
    return [];
  }

  const params = sanitiseTaskQueryParams(queryParams);
  // Detach cols and other params
  const { cols, ...otherParams } = params;

  const mainTaskData = await taskModel.getData(teamId, cols, otherParams);
  if (cols[0] === "*") {
    const taskIds = mainTaskData.map((task) => task.id);
    const taskDoers = await taskModel.getTaskDoers(taskIds);
    // Add task doers to main task data
    for (const task of mainTaskData) {
      task.taskDoers = taskDoers[task.id] || [];
    }
  }
  return mainTaskData;
};

/**
 * Ensures all query parameters relating to task fetching are valid and throws
 * an error if they are not. It also cleans data in ways such as standardising
 * all data that can be an array into an array and parsing numbers
 *
 * @param {Object} queryParams - The query parameters to filter and format task data.
 * @param {string} [queryParams.limit] - Max number of tasks to return (1-100).
 * @param {string} [queryParams.offset] - Number of tasks to skip (1-100).
 * @param {string} [queryParams.orderBy] - Column to order by ('due_date', etc.).
 * @param {string} [queryParams.sortDirection] - Sorting direction ('asc' or 'desc').
 * @param {string} [queryParams.taskStatus] - Task status filter.
 * @param {string|string[]} [queryParams.assignedTo] - User IDs.
 * @param {stringstring|string[]} [queryParams.cols] - Columns to select.
 *
 */

const sanitiseTaskQueryParams = (params = {}) => {
  const errors = [];

  // Store 'cleaned' data (Eg parsed nums) (Destructuring done to make a clone)
  const cleaned = { ...params };

  Object.keys(params).forEach((key) => {
    if (!queryParams.tasks.params.includes(key)) {
      errors.push(`'${key}' is not a valid query parameter`);
    }
  });

  // Integer checks
  ["limit", "offset"].forEach((queryKey) => {
    if (params[queryKey] !== undefined) {
      const num = Number(params[queryKey]);
      if (!Number.isInteger(num) || num < 0) {
        errors.push(`'${queryKey}' must be an integer >= 0`);
      } else {
        cleaned[queryKey] = num;
      }
    }
  });

  // Enumerated string literal values that certain query parameters must be
  const queryEnums = queryParams.tasks.paramEnums;

  // Enumerated value checks
  ["orderBy", "sortDirection", "taskStatus"].forEach((queryKey) => {
    if (params[queryKey] !== undefined) {
      const value = params[queryKey].toLowerCase();

      const validString = queryEnums[queryKey].includes(value);
      if (!validString) {
        errors.push(
          `'${queryKey}' must be one of [${queryEnums[queryKey].join(", ")}]`
        );
      } else {
        cleaned[queryKey] = value;
      }
    }
  });

  // Check the assignedTo is either a number or array of numbers
  if (params.assignedTo !== undefined) {
    const ids = Array.isArray(params.assignedTo)
      ? // A lot of this logic might be pointless but it work
        params.assignedTo.map((id) => String(id).split(",")).map(Number)
      : String(params.assignedTo).split(",").map(Number);

    if (ids.some((id) => !Number.isInteger(id) || id < 0)) {
      errors.push("All assignedTo IDs must be integers >= 0");
    } else {
      cleaned.assignedTo = ids;
    }
  }

  // Select all cols if no specific cols provided
  if (params.cols === undefined) {
    cleaned.cols = ["*"];
  } else {
    const arrCols = Array.isArray(params.cols)
      ? params.cols.map((col) => String(col).split(","))
      : String(params.cols).split(",");
    const arrColsLower = arrCols.map((col) => col.toLowerCase());
    if (arrColsLower.some((col) => !sqlColumns.tasks.includes(col))) {
      errors.push(`Invalid SQL table column provided in the 'cols' parameter`);
    } else {
      cleaned.cols = arrColsLower;
    }
  }

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`);
    err.code = "INVALID_INPUT";
    throw err;
  }

  return cleaned;
};

// Validate and clean data, get the team the user is on and upload the post
const postTask = async (userId, taskData) => {
  const cleanedTaskData = sanitisePostTaskData(taskData);

  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  cleanedTaskData.teamId = teamId;

  if (!cleanedTaskData.teamId) {
    const err = new Error("User must be part of a team to perform this action");
    err.code = "NO_TEAM_MEMBERSHIP";
    throw err;
  }

  // Make sure all the users actually exist
  for (id in cleanedTaskData.assignedTo) {
    const name = userModel.getData(id, ["name"]);
    if (!name.length === 0) {
      const err = new Error(`Cannot assign to ${id} as they do not exist`);
      err.code = "USER_NOT_FOUND";
      throw err;
    }
  }
  
  // Split data that will go in different tables
  const { assignedTo, ...coreTaskData } = cleanedTaskData;
  
  // Insert the task and get the ID of that new task
  const taskId = await taskModel.postTask(coreTaskData);

  await taskModel.addAssignedUsersToTask(taskId, assignedTo);

  // Return all of the cleaned task data
  return cleanedTaskData;
};

/**
 * Make sure all the post data is valid, clean certain data up and return that
 * @param {string} taskData.title
 * @param {string} taskData.description
 * @param {number} taskData.difficulty
 * @param {number[]} taskData.assignedTo
 * @param {string} taskData.dueDate
 * @returns cleaned data
 */

const sanitisePostTaskData = (taskData = {}) => {
  const errors = [];

  const cleaned = { ...taskData };

  // Handle missing strings, empty strings and non-strings
  ["title", "description"].forEach((field) => {
    if (!taskData[field] || typeof taskData[field] != "string") {
      errors.push(`'${field}' must be a non-empty string`);
    }
  });

  if (
    !taskData.difficulty ||
    taskData.difficulty < 0 ||
    taskData.difficulty > 10 ||
    !Number.isInteger(taskData.difficulty)
  ) {
    errors.push(`'difficulty' must be an integer from 0-10`);
  }

  if (
    !taskData.assignedTo ||
    !Array.isArray(taskData.assignedTo) ||
    !taskData.assignedTo.length ||
    !taskData.assignedTo.every((id) => id > 0 && Number.isInteger(id))
  ) {
    errors.push(`'assignedTo' must be an array of positive integers`);
  }

  const dateObj = new Date(taskData.dueDate);
  // Get time is a simple way to check if the date obj is wrong because bad
  // inputs will become NaN
  const timestamp = dateObj.getTime();
  if (isNaN(timestamp) || timestamp <= Date.now()) {
    errors.push(`'dueDate' must be a valid ISO date string in the future`);
  }
  cleaned.dueDate = dateObj;

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`);
    err.code = "INVALID_INPUT";
    throw err;
  }

  return cleaned;
};

// Allow someone a task is assigned to to claim a task is complete
const claimTaskCompletion = async (userId, taskId) => {
  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  if (!teamId) {
    const err = new Error("User is not on a team so they cant edit any tasks");
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }
  await taskModel.editTaskOnTeam({ task_status: "pending" }, taskId, teamId);
};

// Try and vote for a task, then return that vote along with the total vote
// count
const voteOnCompletion = async (userId, taskId) => {
  // Object that will contain the new vote, total votes and whether the task is
  // now complete or not

  const vote = await taskModel.voteOnCompletion(userId, taskId);
  const totalVotes = await taskModel.getTaskVoteCount(taskId);

  // Handle setting the task to complete if this is the case
  // Get the size of a team
  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  const teamSize = await teamModel.getTeamSize(teamId);

  let completed = false;
  const percentApproved = totalVotes / teamSize;
  // We may have a possible floating point error here?
  if (percentApproved >= voting.teamPercentNeededToApprove) {
    await taskModel.handleTaskCompletion(taskId);
    completed = true;
  }

  return { vote, totalVotes, completed };
};

const getTeamSettings = async (userId) => {
  const data = await teamModel.viewTeamData(userId);
  return data;
}


module.exports = {
  getTaskData,
  sanitiseTaskQueryParams,
  postTask,
  sanitisePostTaskData,
  claimTaskCompletion,
  voteOnCompletion,
  getTeamSettings
};
