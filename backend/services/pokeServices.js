const teamModel = require("../models/teamModel");
const pokeUtils = require("../utils/pokeUtils");

// Handle all the leveling and stat logic after completing a task
const handleTaskCompletion = async (taskId, teamId, userId) => {
  // Add XP and get the level we are currently at
  const task = await taskModel.getTaskView(taskId, teamId);
  const xpGained = pokeUtils.taskDifficultyToXp(task.difficulty);

  const xp = await teamModel.updateAndGetXp(teamId, xpGained);

  // Now we have the level we can set the stats as a result of that
  const teamData = await teamModel.viewTeamData(userId);
  const pokeName = teamData.team.pokemon_name;
  const lvl = pokeUtils.levelFromXp(xp);
  const statObj = pokeUtils.levelToStatObj(lvl);

  await teamModel.changeTeamData(statObj);
};

module.exports = {
  handleTaskCompletion,
};
