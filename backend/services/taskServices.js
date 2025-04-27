const userModel = require('../models/userModel')
const taskModel = require('../models/taskModel')

const getTaskData = async (userId, queryParams) => {

  const params = sanitiseTaskQueryParams(queryParms)

  const teamId = await userModel.getData(userId, ['team_id'])


  // A user not being a team is not necessarily an error, it just means they 
  // won't have any tasks
  if (!teamId) {
    return []
  }

  const baseData = await taskModel.getData()

  const returnData = [...baseData]

  
  

 
  // Make sure that the user actually exists, and is in a team

  // Collect all the data that they need
};

const sanitiseTaskQueryParams = (params) => {
  const validParams = [
    "limit",
    "offset",
    "sortBy",
    "sortDirection",
    "status",
    "assignedTo",
    ""    
  ];

  const validOptions = {
    sortBy: ["dueDate", "alphabetical", "completionDate"],
    sortDirection: ["asc", "desc"],
    status: ["complete", "incomplete", "pending"],
  };

  const errors = []
  
  // Store 'cleaned' data (E.g. parsed nums) (Destructuring done to create a clone)
  const cleaned = {...params}

  // Integer checks
  Object.keys(params).forEach(key => {
    if (!validParams.includes(key)) {
      errors.push(`${key} is not a valid query parameter`)
    }
  })
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

  // Enumerated value checks
  ["sortBy", "sortDirection", "status"].forEach(queryKey => {
    const validString = validOptions[queryKey].includes(params[queryKey])
    if (params[queryKey] !== undefined && !validString) {
      errors.push(`${queryKey} must be one of [${validOptions[queryKey].join(", ")}]`)
    }
  })

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`)
    err.code = 'INVALID_INPUT'
    throw err
  }

  return cleaned
};

module.exports = { getTaskData };
