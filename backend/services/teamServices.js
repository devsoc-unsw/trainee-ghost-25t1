const teamModel = require('../models/teamModel')
const userModel = require("../models/userModel");

// To do add comment
const createTeam = async (userId, teamData) => {

  validateTeamData(teamData);

  const teamId = await teamModel.createTeam({ ...teamData, adminUserId: userId})
  // The user is the admin of the team on the team table, but their user table
  // does not store that they are a member of the team. We must change that
  await userModel.addUserToTeam(teamId, userId)

  return {...teamData, teamId};
};

// Go through team data and throw an error if there is an issue (No return)
const validateTeamData = (data) => {
  const errors = [];

  const stats = ["hp", "attack", "defence", "spAttack", "spDefense", "speed"];

  stats.forEach(stat => {
    if (data[stat] !== undefined) {
        if (isNaN(data[stat])) {
            errors.push(`'${stat}' must be a number`);
        }
    }
  })

  const stringMaxLens = {
    name: 255,
    classCode: 8,
    assignment: 255,
    pokemonName: 100
  }

  Object.entries(stringMaxLens).forEach(([key, len]) => {
    // Deal non-strings, empty strings and strings too long
    if (!data[key] || typeof data[key] !== 'string' || data[key].length > len) {
        errors.push(`'${key}' must be a string of 1 - ${len} characters `);
    }
  })

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`);
    err.code = "INVALID_INPUT";
    throw err;
  }
};

module.exports = { createTeam, validateTeamData };
