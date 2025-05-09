/**
 * Retrieves task data from the database for a given task ID with optional
 * filtering, ordering, and pagination.
 *
 * @param {number|string} id - The unique identifier of the task.
 * @param {string[]} cols - Array of columns to retrieve. Use '*' or an empty
 * array to select all allowed columns.
 * @param {Object} params - Additional parameters to customize the query.
 */

const sqlColumns = require("../constants/sqlColumns");

const getData = async (id, cols, params) => {
  // Allow wildcard '*' or no columns param to select all allowed columns
  let selectedCols;
  if (!cols || cols.length === 0 || cols.includes("*")) {
    selectedCols = [...sqlColumns.tasks];
  } else {
    selectedCols = cols.filter((col) => sqlColumns.tasks.includes(col));
  }

  if (selectedCols.length === 0) {
    const err = new Error("No valid columns requested");
    err.code = "SERVER_ERROR";
    throw err;
  }

  let query = `
      SELECT ${selectedCols.join(", ")} FROM tasks WHERE id = ?
      `;
  const values = [id];

  if (params.status) {
    query += ` AND status = ?`;
    values.push(params.status);
  }
  if (params.assignedTo) {
    const placeholders = params.assignedTo.map(() => "?").join(", ");
    query += ` AND assigned_to IN (${placeholders})`;
    values.push(...params.assignedTo);
  }
  if (params.orderBy) {
    // We  do ?? so we can escape the first (We dont want to reference
    // order by as a value, it is a table identifier)
    query += ` ORDER BY ??`;
    values.push(params.orderBy);
  }
  if (params.sortDirection) {
    // only allow ASC or DESC
    const dir = params.sortDirection.toUpperCase() === "DESC" ? "DESC" : "ASC";
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

  const [rows] = await db.query(query, values);
  return rows;
};

module.exports = { getData };
