exports.getTaskData = (userId, queryParams) => {
  const validParams = [
    "limit",
    "offset",
    "sortBy",
    "sortDirection",
    "status",
    "assignedTo",
  ];
  
  // ⚠️⚠️ WORK IN PROGRESS ⚠️⚠️ (Also pretty terrible code rn ngl)
  
  // If there is a param that isn't in the allowed params
  if (!queryParams.every(param => validParams.includes(queryParams))) {
    const err = new Error("Invalid query parameter")
    err.code = "INVALID_QUERY_PARAMETER";
    throw err;
  }

  if (Number.isInteger(limit) || limit < 1 || limit > 100) {
    const err = new Error("Limit must be an integer between 1 and 100")
    err.code = "INVALID_LIMIT_PARAM";
    throw err;
  }

  if (Number.isInteger(offset) || offset < 1 || offset > 100) {
    const err = new Error("Offset must be an integer between 1 and 100")
    err.code = "INVALID_OFFSET_PARAM"
    throw err;
  }

  const validSortByParams = ["dueDate", "alphabetical", "completionDate"]

  if (validSortedByParams.includes(sortBy)) {
    const err = new Error("Offset must be an integer between 1 and 100")
    err.code = "INVALID_OFFSET_PARAM"
    throw err;
  }

  // Validate all query params and return if they are false
  
  // Make sure that the user actually exists, and is in a team
  
  // Collect all the data that they need
};
