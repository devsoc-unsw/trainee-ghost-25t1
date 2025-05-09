const userModel = require('../models/userModel')
const taskModel = require('../models/taskModel');
const { sqlColumns } = require('../constants/sqlColumns');
const queryParams = require('../constants/queryParams');

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
  const teamId = await userModel.getData(userId, ['team_id'])
  // A user not being a team is not necessarily an error, it just means they 
  // won't have any tasks. Early return if this occurs
  if (!teamId) {
    return []
  }

  const params = sanitiseTaskQueryParams(queryParams)
  // Detach cols and other params
  const {cols, ...otherParams} = params

  return await taskModel.getData(teamId, cols, otherParams)
};

/**
 * Ensures all query parameters relating to task fetching are valid and throws
 * an error if they are not. It also cleans data in ways such as standardising
 * all data that can be an array into an array and parsing numbers
 * 
 * @param {Object} queryParams - The query parameters to filter and format task data.
 * @param {string} [queryParams.limit] - Max number of tasks to return (1-100).
 * @param {string} [queryParams.offset] - Number of tasks to skip (1-100).
 * @param {string} [queryParams.orderBy] - Column to order by ('dueDate', etc.).
 * @param {string} [queryParams.sortDirection] - Sorting direction ('asc' or 'desc').
 * @param {string} [queryParams.status] - Task status filter.
 * @param {string|string[]} [queryParams.assignedTo] - User IDs.
 * @param {stringstring|string[]} [queryParams.cols] - Columns to select.
 * 
 */

const sanitiseTaskQueryParams = (params) => {
  // We will store errors as we go along
  const errors = []
  
  // Store 'cleaned' data (Eg parsed nums) (Destructuring done to make a clone)
  const cleaned = {...params}

  // Check for invlaid data
  Object.keys(params).forEach(key => {
    if (!queryParams.tasks.params.includes(key)) {
      errors.push(`${key} is not a valid query parameter`)
    }
  })
  
  // Integer checks
  ["limit", "offset"].forEach(queryKey => {
    if (params[queryKey] !== undefined) {
        const num = Number(params[queryKey])
        if (!Number.isInteger(num) || num < 1 || num > 100) {
          errors.push(`${queryKey} must be an integer between 1 and 100`)
        } else {
          cleaned[queryKey] = num;
        }
    }
  })

  // Enumerated string literal values that certain query parameters must be
  const queryEnums = queryParams.tasks.paramEnums

  // Enumerated value checks
  ["orderBy", "sortDirection", "status"].forEach(queryKey => {
    const validString = queryEnums[queryKey].includes(params[queryKey])
    if (params[queryKey] !== undefined && !validString) {
      errors.push(`${queryKey} must be one of [${queryEnums[queryKey].join(", ")}]`)
    } else {
      cleaned[queryKey] = params[queryKey]
    }
    
  })

  // Check the assignedTo is either a number or array of numbers
  if (params.assignedTo !== undefined) {
    const ids = Array.isArray(params.assignedTo)
      ? params.assignedTo?.map(id => Number(id))
      : [Number(params.assignedTo)]

      if (ids.some(id => !Number.isInteger(id))) {
        errors.push("All assignedTo IDs must be an integer")
      } else {
        cleaned.assignedTo = ids
      }
  }

  // Select all cols if no specific cols provided
  if (params.cols === undefined) {
    cleaned.cols = ["*"]
  } else {
    const arrCols = Array.isArray(params.cols)
      ? params.cols
      : [params.cols]
      // Check that the inputted columns are actually in the sql table
      if (arrCols.some(col => !sqlColumns.tasks.includes(col))) {
        errors.push(`Invalid SQL table column provided in the 'cols parameter`)
      } else {
        cleaned.cols = arrCols.map(col => col.toLowerCase())
      }
  } 

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`)
    err.code = 'INVALID_INPUT'
    throw err
  }

  return cleaned
};

module.exports = { getTaskData };
