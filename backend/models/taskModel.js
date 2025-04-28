/**
 * Retrieves task data from the database for a given task ID with optional filtering, ordering, and pagination.
 *
 * @param {number|string} id - The unique identifier of the task.
 * @param {string[]} cols - Array of columns to retrieve. Use '*' or an empty array to select all allowed columns.
 * @param {Object} params - Additional parameters to customize the query.
 * @param {string} [params.status] - Filter tasks by status.
 * @param {Array} [params.assignedTo] - Filter tasks by an array of assigned user IDs.
 * @param {string} [params.orderBy] - Column name to order the results by.
 * @param {string} [params.sortDirection] - Sorting direction ('ASC' or 'DESC'). Defaults to 'ASC'.
 * @param {number|string} [params.limit] - Maximum number of records to return.
 * @param {number|string} [params.offset] - Number of records to skip from the beginning of the result set.
 * @returns {Promise<Array>} Resolves with an array of task records from the database.
 * @throws {Error} Throws an error with code "SERVER_ERROR" if no valid columns are requested.
 */


/**
 * Ensures all query parameters relating to task fetching are valid and throws
 * an error if they are not. It also cleans data in ways such as standardising
 * all data that can be an array into an array and parsing numbers
 * 
 * @param {Object} id - The unique identifier of the task
 * @param {string[]} cols - Array of columns to select
 * @param {string} [queryParams.limit] - Max number of tasks to return (1-100)
 * @param {string} [queryParams.offset] - Number of tasks to skip (1-100)
 * @param {string} [queryParams.orderBy] - Column to order by ('dueDate', etc.)
 * @param {string} [queryParams.sortDirection] - Sorting direction ('asc' or 'desc')
 * @param {string} [queryParams.status] - Task status filter
 * @param {string|string[]} [queryParams.assignedTo] - User IDs of who the
 * tasks can be assigned to 
 * @param {stringstring|string[]} [queryParams.cols] - Columns to select.
 * 
 * @returns {Promise<Object[]} A promise that resolves to an array of task objs
 */

const sqlColumns = require("../constants/sqlColumns");

exports.getData = async (id, cols, params) => {
    // Allow wildcard '*' or no columns param to select all allowed columns
    let selectedCols
    if (!cols || cols.length === 0 || cols.includes('*')) {
        selectedCols = [...sqlColumns.tasks]
    } else {
        selectedCols = cols.filter(col => sqlColumns.tasks.includes(col))
    }

    if (selectedCols.length === 0) {
        const err = new Error("No valid columns requested");
        err.code = "SERVER_ERROR";
        throw err
    }

    let query = `
      SELECT ${selectedCols.join(", ")} FROM tasks WHERE id = ?
      `
    const values = [id]
      
    if (params.status) {
        query += ` AND status = ?`
        values.push(params.status)
    }
    if (params.assignedTo) {
        const placeholders = params.assignedTo.map(() => '?').join(", ");
        query += ` AND assigned_to IN (${placeholders})`
        values.push(...params.assignedTo)
    }
    if (params.orderBy) {
        // We  do ?? so we can escape the first (We dont want to reference
        // order by as a value, it is a table identifier)
        query += ` ORDER BY ??`
        values.push(params.orderBy) 
    }
    if (params.sortDirection) {
        // only allow ASC or DESC
        const dir = params.sortDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        query += ` ${dir}`;
    }
    if (params.limit != null) {
        query += ` LIMIT ?`;
        values.push(parseInt(params.limit, 10));
    }
    if (params.offset != null) {
        query += ` OFFSET ?`;
        values.push(parseInt(params.offset, 10));
    }
    
    const [rows] = await db.query(query, values)
    return rows
}

module.exports = { getData}