const sqlColumns = require("../constants/sqlColumns");

/**
 * A broad function that allows you to get any core data about a task
 *
 * @param {number} id - The ID of team to fetch the tasks of.
 * @param {string[]} columns - Array of column names to fetch.
 * @returns {Promise<Object|undefined>} A promise resolving to the task data object or undefined if not found.
 * @throws {Error} If no valid columns are requested.
 */

exports.getData = async (id, columns) => {
    // Allow wildcard '*' or no columns param to select all allowed columns
    let selectedCols;
    if (!columns || columns.length === 0 || columns.includes('*')) {
        selectedCols = [...sqlColumns.tasks];
    } else {
        selectedCols = columns.filter(col => sqlColumns.tasks.includes(col));
    }

    if (selectedCols.length === 0) {
        const err = new Error("No valid columns requested");
        err.code = "SERVER_ERROR";
        throw err;
    }

    const query = `
      SELECT ${selectedCols.join(", ")} FROM tasks WHERE id = ?
      `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
}

exports.getTaskAssigned