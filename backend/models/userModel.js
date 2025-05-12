const db = require("../config/db.js");

const { sqlColumns } = require("../constants/sqlColumns");


/**
 * Inserts a new user into the database.
 *
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.name - The full name of the user.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's hashed password.
 * @returns {Promise<Object>} A promise resolving to the result of the operation
 */

exports.createUser = async ({ name, email, password }) => {
  const query = `
        INSERT INTO users
        (name, email, hashed_password)
        VALUES (?, ?, ?)`;

  const [result] = await db.query(query, [name, email, password]);
  return result.insertId;
};

/**
 * Retrieves the hashed password for a given email address.
 *
 * @param {string} email - The email address of the user
 * @returns {Promise<string|undefined>} A promise that resolves to the hashed
 * password string if found, or undefined.
 */

exports.getHashedPassword = async (email) => {
  const query = `
        SELECT hashed_password FROM users WHERE email = ?
        `;
  const [rows] = await db.query(query, [email]);
  return rows[0]?.hashed_password;
};

/**
 * Takes the email of a user and gets the id of that user
 * @param {string} email - The email address of the user
 * @returns {Promise<id|undefined>} A promise that resolves to the an id or
 * undefined
 */

exports.emailToId = async (email) => {
  const query = `
        SELECT id FROM users WHERE email = ?
        `;
  const [rows] = await db.query(query, [email]);
  return rows[0]?.id;
};

/**
 * A broad function that allows you to get any core data about a user
 *
 * @param {number} id - The ID of the user.
 * @param {string[]} columns - Array of column names to fetch.
 * @returns {Promise<Object|undefined>} A promise resolving to the user data object or undefined if not found.
 * @throws {Error} If no valid columns are requested.
 */

exports.getData = async (id, columns) => {
  // Make sure only valid columns are passed
  columns = columns.filter((col) => sqlColumns.users.includes(col));

  if (columns.length === 0) {
    const err = new Error("No valid columns requested");
    err.code = "SERVER_ERROR";
    throw err;
  }

  const query = `
    SELECT ${columns.join(", ")} FROM users WHERE id = ?
    `;
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

exports.addUserToTeam = async (userId, teamId) => {
  const query = ` 
    UPDATE users
    SET team_id = ?
    WHERE id = ?
  `
  const params = [teamId, userId]

  const [result] = await db.query(query, params)

  // We need to throw an error if this user isnt found 
  if (result.affectedRows === 0) {
    const err = new Error(`Either team '${teamId}' or user '${userId}' could not be found or user is in this team`);
    err.code = 'USER_NOT_FOUND'
    throw err;
  }

  return result;
}
