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
  const secureData = validationUtils.filterValidKeys(snakeCaseData, sqlColumns.teams);


  
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
  return teamSize;
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
// currently is unimported since it's a helper function for viewTeamData
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

module.exports = {
  createTeam,
  getTeamByCode,
  userIsAdminForAnother,
  changeTeamData,
  getTeamOfAdmin,
  getTeamSize,
  viewTeamData,
  getTeamCode,
};
