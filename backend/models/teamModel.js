const db = require("../config/db.js");
const { sqlColumns } = require("../constants/sqlColumns.js");
const caseUtils = require("../utils/caseUtils.js")

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
 * @param {number} [data.defence]
 * @param {number} [data.spAttack]
 * @param {number} [data.spDefense]
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
    }, {})

  const cols = Object.keys(secureData).join(", ");
  const placeholders = Object.keys(secureData).map(_ => '?').join(", ");

  const query = `
      INSERT INTO teams (${cols})
      VALUES (${placeholders})`;

  const params = Object.values(secureData);

  const [result] = await db.query(query, params);
  return result.insertId;
};


module.exports = { createTeam };
