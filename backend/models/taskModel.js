const db = require("../config/db.js");
const { sqlColumns } = require("../constants/sqlColumns");
const validationUtils = require("../utils/validationUtils");

/**
 * Retrieves task data from the database for a given task ID with optional
 * filtering, ordering, and pagination.
 *
 * @param {number|string} teamId - The unique identifier of the team
 * @param {string[]} cols - Array of columns to retrieve. Use '*' or an empty
 * array to select all allowed columns.
 * @param {Object} params - Additional parameters to customize the query.
 */

const getData = async (teamId, cols, params) => {
  // Allow wildcard '*' or no columns param to select all allowed columns
  let selectedCols =
    !cols.length || cols.includes("*")
      ? sqlColumns.tasks
      : cols.filter((col) => sqlColumns.tasks.includes(col));

  if (!selectedCols.length) {
    const err = new Error("No valid columns requested");
    err.code = "SERVER_ERROR";
    throw err;
  }

  let query = `
      SELECT ${selectedCols.map((_) => "??").join(", ")}
      FROM tasks
      WHERE team_id = ?
      `;

  const values = [...selectedCols, teamId];

  if (params.taskStatus) {
    query += ` AND task_status = ?`;
    values.push(params.taskStatus);
  }

  if (params.assignedTo) {
    const placeholders = params.assignedTo.map((_) => "?").join(", ");
    query += ` AND id IN (SELECT task_id FROM task_doers WHERE user_id IN (${placeholders}))`;
    values.push(...params.assignedTo);
  }

  if (params.orderBy) {
    query += ` ORDER BY ??`;
    values.push(params.orderBy);
  }

  if (params.sortDirection) {
    const dir = params.sortDirection.toUpperCase() === "DESC" ? "DESC" : "ASC";
    query += ` ${dir}`;
  }

  if (params.limit) {
    query += ` LIMIT ?`;
    values.push(parseInt(params.limit, 10));
  }
  if (params.offset) {
    query += ` OFFSET ?`;
    values.push(parseInt(params.offset, 10));
  }

  const [rows] = await db.query(query, values);
  return rows;
};

// Given an array of task ids, get an array of who needs to do these tasks in
// the format taskId: [userid1, userid2, userid3]:
// {
//   1: [1, 4, 10],
//   2, [3, 4, 5]
// }
const getTaskDoers = async (taskIds) => {
  if (taskIds.length === 0) return {};
  const query = `
    SELECT t.task_id, t.user_id, u.name
    FROM task_doers t
    JOIN users u
      ON u.id = t.user_id 
    WHERE task_id IN (?)
  `;
  const params = [taskIds];

  const [rows] = await db.query(query, params);

  const taskDoersMap = {};

  for (const { task_id, user_id, name } of rows) {
    (taskDoersMap[task_id] ??= []).push({ user_id, name });
  }

  return taskDoersMap;
};

/**
 * Upload a task
 *
 * @param {string} data.title
 * @param {string} data.description
 * @param {Date} data.dueDate
 * @param {number} data.difficulty
 * @param {number} data.teamId
 *
 * @returns {number} - The id of the new task in the database
 */

const postTask = async (data) => {
  
  const query = `
      INSERT INTO tasks (title, description, due_date, difficulty, team_id)
      VALUES (?, ?, ?, ?, ?)`;

  const params = [
    data.title,
    data.description,
    data.dueDate,
    data.difficulty,
    data.teamId,
  ];

  const [result] = await db.query(query, params);
  return result.insertId;
};

// Assign users to a task given the task id and an array of users
const addAssignedUsersToTask = async (taskId, userIds) => {
  const values = userIds.map((_) => `(?, ?)`).join(", ");
  const query = `INSERT INTO task_doers (task_id, user_id) VALUES ${values}`;
  const params = userIds.flatMap((userId) => [taskId, userId]);

  const [result] = await db.query(query, params);
  return result;
};

/**
 * Edit the SQL data for a task. This route only edits tasks if that task is
 * assigned to the team of the teamId passed
 * @param {object} data - An object with camelcase equivilant data to the sql
 * tasks table.
 * @param {number} teamId - The team id which a task must be on to be changed
 */

const editTaskOnTeam = async (data, taskId, teamId) => {
  const snakeCaseData = caseUtils.camelToSnakeCaseObjKeys(data);
  const secureData = validationUtils(snakeCaseData, sqlColumns.tasks);

  if (Object.keys(secureData).length === 0) {
    const err = new Error("No valid fields provided to update");
    err.code = "NO_UPDATE_DATA";
    throw err;
  }

  const placeholders = Object.keys(secureData).map((_) => "?? = ?");

  let query = `
  UPDATE tasks
  SET ${placeholders.join(", ")}
  WHERE team_id = ?
  AND task_id = ?
  `;

  const params = [...Object.entries(secureData).flat(), teamId, taskId];

  const [result] = await db.query(query, params);

  if (result.affectedRows === 0) {
    const err = new Error("Task does not exist or data was the same or prior");
    err.code = "NO_UPDATE_OCCURRED";
    throw err;
  }

  return result;
};

// Try and vote for a task as being completed
const voteOnCompletion = async (userId, taskId) => {
  // Make sure the task exists (We could check affected rows later but that
  // wouldnt allow for distinguishing between already voted and a 404 error)
  const [rows] = await db.query(`SELECT 1 FROM tasks WHERE id = ?`, [taskId]);
  if (rows.length === 0) {
    const err = new Error("Task or user not found");
    err.code = "RESOURCE_NOT_FOUND";
    throw err;
  }

  const voteQuery = `
    INSERT INTO task_completion_votes
    (task_id, user_id)
    VALUES (?, ?)
  `;
  voteParams = [taskId, userId];

  const [result] = await db.query(voteQuery, voteParams);
  if (result.affectedRows === 0) {
    // We have already checked for missing resource errors so this error should
    // only occur for duplicate entries
    const err = new Error("User is attempting to vote twice");
    err.code = "REPEAT_VOTE";
    throw err;
  }
  return { userId, taskId };
};

// Determine how many people have voted for a task as being completed
const getTaskVoteCount = async (taskId) => {
  const query = `
    SELECT COUNT(*) AS vote_count
    FROM task_votes
    WHERE task_id = ?
    `;

  const [rows] = await db.query(query, [taskId]);
  return rows[0].vote_count;
};

// Mark a task as completed
const handleTaskCompletion = async (taskId) => {
  const completingQuery = `
    UPDATE tasks
    SET task_status = 'complete'
    WHERE task_id = ?
  `;
  const [completingResults] = await db.query(completingQuery, [taskId])
  if (completingResults.affectedRows === 0) {
    const err = new Error('Task already complete or task not found');
    err.code = 'NO_UPDATE_OCCURRED';
    throw err;
  }
}

module.exports = {
  getData,
  postTask,
  addAssignedUsersToTask,
  editTaskOnTeam,
  getTaskDoers,
  voteOnCompletion,
  getTaskVoteCount,
  handleTaskCompletion
};
