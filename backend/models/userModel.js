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
  // Query to check if team and user exist, we do this prior so we can be
  // certain failure in the next query is because of a duplicate entry
  const [[user]] = await db.query("SELECT 1 FROM users WHERE id = ?", [userId]);
  const [[team]] = await db.query("SELECT 1 FROM teams WHERE id = ?", [teamId]);

  if (!user) {
    const err = new Error(`User '${userId}' not found`);
    err.code = "USER_NOT_FOUND";
    throw err;
  }
  if (!team) {
    const err = new Error(`Team '${teamId}' not found`);
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }

  const query = ` 
    UPDATE users
    SET team_id = ?
    WHERE id = ?
  `;
  const params = [teamId, userId];

  const [result] = await db.query(query, params);

  // Condition for a duplicate entry
  if (result.affectedRows === 0) {
    const err = new Error(`User is already in this team`);
    err.code = "USER_IN_TEAM";
    throw err;
  }

  return result;
};

// Remove user from a team if possible
// We don't actually need to pass the team id because the user can only
// be part of on team
exports.removeUserFromTeam = async (userId) => {
  const query = `
    UPDATE users
    SET team_id = NULL
    WHERE id = ?
    `;
  const params = userId;

  const [result] = await db.query(query, params);
  if (result.affectedRows === 0) {
    const err = new Error("Cannot remove user from team that is not in a team");
    err.code = "NO_TEAM_TO_REMOVE_FROM";
  }
  return result;
};

// Gets all user data apart from password
exports.getUserData = async (userId) => {
  const query = `
    SELECT id, name, email, created_at, team_id
    FROM users
    WHERE id = ?
  `;
  const [result] = await db.query(query, [userId]);
  return result[0];
};

exports.getNotifications = async (userId) => {
  const query = `
  SELECT 
    n.task_id, n.type, n.created_at,
    CASE
      WHEN COUNT(DISTINCT u.name) = 1 THEN MIN(u.name)
      WHEN COUNT(DISTINCT u.name) = 2 THEN GROUP_CONCAT(u.name SEPARATOR ' and ')
      ELSE CONCAT(MIN(u.name), 'and others')
    END as asignees
  FROM tasks t
  JOIN task_doers d on t.id = d.task_id
  JOIN users u on d.user_id = u.id
  JOIN notifications n on t.id = n.task_id
  WHERE n.user_id = ?
  GROUP BY n.task_id
  ORDER BY n.created_at DESC
  `
  const [rows] = await db.query(query, [userId]);
  return rows;
};

exports.closeNotification = async (userId, taskId) => {
  const query =`
  DELETE FROM notifications
  WHERE task_id = ?
  AND user_id = ?
  `
  await db.query(query, [taskId, userId]);
};
