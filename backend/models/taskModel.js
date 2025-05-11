const db = require("../config/db.js");
const sqlColumns = require("../constants/sqlColumns");

/**
 * Retrieves task data from the database for a given task ID with optional
 * filtering, ordering, and pagination.
 *
 * @param {number|string} id - The unique identifier of the task.
 * @param {string[]} cols - Array of columns to retrieve. Use '*' or an empty
 * array to select all allowed columns.
 * @param {Object} params - Additional parameters to customize the query.
 */

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
    data.title,
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

module.exports = { getData, postTask, addAssignedUsersToTask };
