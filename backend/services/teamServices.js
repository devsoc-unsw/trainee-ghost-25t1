const teamModel = require("../models/teamModel");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const taskServices = require("../services/taskServices");
const strUtils = require("../utils/strUtils");
const pokeUtils = require("../utils/pokeUtils");

// Validates data, gets a random join code, creates the team then adds a user to
// the team
const createTeam = async (userId, teamData) => {
  validateTeamData(teamData);

  teamData.randomCode = strUtils.getRandomStr(8);
  teamData.xp = pokeUtils.getStartingXp();
  const baseStats = await pokeUtils.getBaseStats(teamData.pokemonName);
  
  const fullTeamData = {...baseStats, ...teamData};

  const teamId = await teamModel.createTeam({
    ...fullTeamData,
    adminUserId: userId,
  });
  console.log(baseStats, teamData)
  // The user is the admin of the team on the team table, but their user table
  // does not store that they are a member of the team. We must change that
  await userModel.addUserToTeam(userId, teamId);

  return { ...fullTeamData, teamId };
};

// Go through team data and throw an error if there is an issue (No return)
const validateTeamData = (data) => {
  const errors = [];

  const stats = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"];

  stats.forEach((stat) => {
    if (data[stat] !== undefined) {
      if (isNaN(data[stat])) {
        errors.push(`'${stat}' must be a number`);
      }
    }
  });

  const stringMaxLens = {
    name: 255,
    classCode: 8,
    assignment: 255,
    pokemonName: 100,
  };

  Object.entries(stringMaxLens).forEach(([key, len]) => {
    // Deal non-strings, empty strings and strings too long
    if (!data[key] || typeof data[key] !== "string" || data[key].length > len) {
      errors.push(`'${key}' must be a string of 1 - ${len} characters `);
    }
  });

  if (errors.length) {
    const err = new Error(`Errors: ${errors.join("\n")}`);
    err.code = "INVALID_INPUT";
    throw err;
  }
};

// Determine if the join code a user has is valid and add them to the team if so
const joinTeam = async (userId, randomCode) => {
  const teamData = await teamModel.getTeamByCode(randomCode);
  if (!teamData) {
    const err = new Error("Random code does not match any team");
    err.code = "TEAM_NOT_FOUND";
    throw err;
  }

  await userModel.addUserToTeam(userId, teamData.id);

  return teamData;
};

const kickFromTeam = async (adminId, kickedId) => {
  const adminIsLegit = await teamModel.userIsAdminForAnother(adminId, kickedId);
  if (!adminIsLegit) {
    const err = new Error(
      "User is not the admin of the user they wish to kick"
    );
    err.code = "FORBIDDEN";
    throw err;
  }

  await teamModel.removeUserFromTeam(adminId, kickedId);
};

const leaveTeam = async (userId) => {
  await userModel.removeUserFromTeam(userId);
};

const changeTeamCode = async (adminId) => {
  const teamId = await teamModel.getTeamOfAdmin(adminId);
  const randomCode = strUtils.getRandomStr(8);
  await teamModel.changeTeamData({ randomCode }, teamId);
  return randomCode;
};

const getTeamSettings = async (userId) => {
  const data = await teamModel.viewTeamData(userId);
  return data;
};

const getJoinCode = async (userId) => {
  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  const code = await teamModel.getTeamCode(teamId);
  return code;
};

const alterCoreTeamData = async (userId, newData) => {
  const { team_id: teamId } = await userModel.getData(userId, ["team_id"]);
  await teamModel.changeTeamData(newData, teamId);
  return;
};

const getHomePage = async (userId) => {
  const team = await teamModel.viewTeamData(userId);
  const incompleteTaskParams = {
    assignedTo: [userId],
    orderBy: "due_date",
    sortDirection: "DESC",
    limit: "2",
    taskStatus: "incomplete"
  };
  await teamModel.getOverdueTaskNotifications(userId);

  const tasks = await taskServices.getTaskData(userId, incompleteTaskParams);
  const notifications = await userModel.getNotifications(userId);
  const taskDoers = await taskModel.getTaskDoers([notifications.id]);
  notifications.taskDoers = taskDoers[notifications.id];
  return { team, tasks, notifications };
};

module.exports = {
  createTeam,
  validateTeamData,
  joinTeam,
  leaveTeam,
  kickFromTeam,
  changeTeamCode,
  getTeamSettings,
  getJoinCode,
  alterCoreTeamData,
  getHomePage
};
