const db = require("../config/db.js");
const { sqlColumns } = require("../constants/sqlColumns.js");
const caseUtils = require("../utils/caseUtils.js");
const validationUtils = require("../utils/validationUtils.js");

/**
 * Create a team pokemon
 *
 * @param {string} data.name
 * @param {string} data.classCode
 * @param {string} data.assignment
 * @param {string} data.pokemonName
 * @param {number} data.adminUserId
 * @param {number} [data.xp]
 * @param {number} [data.hp]
 * @param {number} [data.attack]
 * @param {number} [data.defense]
 * @param {number} [data.specialAttack]
 * @param {number} [data.specialDefense]
 * @param {number} [data.speed]
 *
 * @returns {number} - The id of the new team
 */
const createTeam = async (data) => {
  const snakeCaseData = caseUtils.camelToSnakeCaseObjKeys(data);

  // Validate sql data once again against allowed data to be EXTRA safe
  // against sql injection
  const secureData = sqlColumns.teams.reduce((obj, col) => {
    if (snakeCaseData[col] !== undefined) {
      obj[col] = snakeCaseData[col];
    }
    return obj;
  }, {});

  const cols = Object.keys(secureData).join(", ");
  const placeholders = Object.keys(secureData)
    .map((_) => "?")
    .join(", ");

  const query = `
      INSERT INTO teams (${cols})
      VALUES (${placeholders})`;

  const params = Object.values(secureData);

  const [result] = await db.query(query, params);
  return result.insertId;
};

// Get team data based on a joining code
const getTeamByCode = async (randomCode) => {
  const query = `SELECT * FROM teams WHERE random_code = ?`;
  const params = [randomCode];

  const [rows] = await db.query(query, params);
  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};

/**
 * Check if one user is the admin of a team which the other user is on.
 * @param {number} adminId - The id of the user we want to check is the admin
 * @param {number} otherId - The user whose team we are making sure adminId is
 * in charge of
 * */
const userIsAdminForAnother = async (adminId, otherId) => {
  const query = `
    SELECT t.admin_user_id
    FROM users u
    JOIN teams t
    ON u.team_id = t.id
    WHERE u.id = ?
  `;
  const params = [otherId];

  const [rows] = await db.query(query, params);
  const realAdminId = rows[0]?.admin_user_id;

  return realAdminId === adminId;
};

// Change the data of a team. Accepts a camelcase object of team data
const changeTeamData = async (data, teamId) => {
  const snakeCaseData = caseUtils.camelToSnakeCaseObjKeys(data);
  const secureData = validationUtils.filterValidKeys(
    snakeCaseData,
    sqlColumns.teams
  );

  if (Object.keys(secureData).length === 0) {
    const err = new Error("No valid fields provided to update");
    err.code = "NO_UPDATE_DATA";
    throw err;
  }

  const placeholders = [];
  const params = [];

  for (const [col, val] of Object.entries(secureData)) {
    placeholders.push("?? = ?");
    params.push(col, val);
  }

  let query = `
  UPDATE teams
  SET ${placeholders.join(", ")}
  WHERE id = ?
  `;

  params.push(teamId);

  const [result] = await db.query(query, params);

  if (result.affectedRows === 0) {
    const err = new Error("Team does not exist or data was the same or prior");
    err.code = "NO_UPDATE_OCCURRED";
    throw err;
  }

  return result;
};

/**
 * Remove a user from a team
 * Note: It will auto remove the user from all tasks are reallocate it to the admin
 * @param {int} adminId 
 * @param {int} kickedId 
 */
const removeUserFromTeam = async (adminId, kickedId) => {
  const removeUserQuery = `
    UPDATE users u
    JOIN teams t ON u.team_id = t.id
    SET u.team_id = NULL
    WHERE u.id = ? AND t.admin_user_id = ?;
    `

  const params = [kickedId, adminId];
  const [result] = await db.query(removeUserQuery, params);
  if (result.affectedRows === 0) {
    const err = new Error("User you are attempting to kick is not in your team or you are not the admin");
    err.code = "USER_NOT_ADMIN";
    throw err;
  }

  // remove the user from all tasks
  const reassignTasksQuery = `
      INSERT INTO task_doers (task_id, user_id)
      SELECT task_id, ? FROM task_doers
      WHERE user_id = ?
      ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);
    `;
  await db.query(reassignTasksQuery, [adminId, kickedId]);
  const deleteTasksQuery = `DELETE FROM task_doers WHERE user_id = ?;`;
  await db.query(deleteTasksQuery, [kickedId]);
}

// Add a given amount of xp to a teams total xp and return that
const updateAndGetXp = async (teamId, addedVal) => {
  // Update the table
  const updateQuery = `
    UPDATE teams
    SET xp = xp + ?
    WHERE id = ?
  `;
  const [updateResult] = await db.query(updateQuery, [addedVal, teamId]);
  if (updateResult.affectedRows === 0) {
    const err = new Error("Team does not exist");
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }

  // Get the new val
  const selectQuery = `
    SELECT xp
    FROM teams
    WHERE id = ?
  `
  const [selectResult] = await db.query(selectQuery, [teamId])
  return rows[0].xp;
};

// Specifically get the team of an admin. Technically we could replace this with
// a generalised route just getting the team of a user. However, there may be
// a bug where a user is an admin of a team without being on it and this
// protects against that
const getTeamOfAdmin = async (adminId) => {
  const query = `
    SELECT id
    FROM teams
    WHERE admin_user_id = ?;
  `;
  const params = [adminId];

  const [rows] = await db.query(query, params);

  if (rows.length === 0) {
    const err = new Error("No team found for this admin");
    err.code = "USER_NOT_ADMIN";
    throw err;
  }

  return rows[0].id;
};

const getTeamSize = async (teamId) => {
  const query = `
    SELECT COUNT(*) AS team_size
    FROM users u
    JOIN teams t
      ON t.id = u.team_id
    WHERE t.id = ?
  `;

  const params = [teamId];
  const [rows] = await db.query(query, params);
  return rows[0].team_size;
};

//  Obtains all data required for settings in an object form
const viewTeamData = async (userId) => {
  const query = `
    SELECT
      t.id,
      t.name,
      t.admin_user_id,
      t.class_code,
      t.assignment,
      t.xp,
      t.hp,
      t.attack,
      t.defense,
      t.special_attack,
      t.special_defense,
      t.speed,
      t.pokemon_name
    FROM
      teams t
    JOIN users u on t.id = u.team_id
    WHERE u.id = ?`;

  const [rows] = await db.query(query, [userId]);

  if (rows.length === 0) {
    const err = new Error("Team does not exist");
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }
  const team = rows[0];
  const members = await getTeamMembers(rows[0].id);

  return { team, members };
};

// A method to get all team members with the corresponding team id
const getTeamMembers = async (teamId) => {
  const query = `
  SELECT name, id
  FROM users
  WHERE team_id = ?`;

  const [rows] = await db.query(query, [teamId]);
  return rows;
};

const getTeamCode = async (teamId) => {
  const [rows] = await db.query(`SELECT random_code FROM teams WHERE id = ?`, [
    teamId,
  ]);

  if (rows.length === 0) {
    const err = new Error("Team not found or they do not have a random code");
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }
  return rows[0].random_code;
};

const getOverdueTaskNotifications = async (userId) => {
  const query = `
  SELECT id
  FROM tasks
  WHERE due_date < NOW()
  AND team_id IN (
    SELECT team_id
    FROM users
    WHERE id = ?
  )
  AND task_status = 'incomplete';
  `

  const [rows] = await db.query(query, [userId]);
  rows.forEach(task => notifyTeamMembers(task.id, teamId, 'incomplete'));
}

const notifyTeamMembers = async (taskId, teamId, type) => {
  const query = `
  SELECT u.id
  FROM tasks t
  JOIN users u ON t.team_id = u.team_id
  WHERE t.id = ?;
  `
  const [rows] = await db.query(query, [teamId]);
  const query2 = `
  INSERT INTO notifications (user_id, task_id, type)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    type = VALUES(type),
    created_at = NOW();
  `

  for (const user of rows) {
    await db.query(query2, [user.id, taskId, type]);
    // extension: send email to each user when task_status = 'pending'
  }
};

module.exports = {
  createTeam,
  getTeamByCode,
  userIsAdminForAnother,
  changeTeamData,
  getTeamOfAdmin,
  getTeamSize,
  viewTeamData,
  getTeamMembers,
  getTeamCode,
  updateAndGetXp,
  removeUserFromTeam,
  getOverdueTaskNotifications,
  notifyTeamMembers
};
