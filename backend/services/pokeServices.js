const teamModel = require('../models/teamModel');
const pokeUtils = require('../utils/pokeServices');

// Add the xp to a team after completing a given task
const addTaskCompletionXp = (teamId, taskDifficulty) => {
  const xpGained = pokeUtils.taskDifficultyToXp(taskDifficulty);
  await teamModel.changeTeamData(teamId, )
  
}

module.exports = {
    handleXpGain
}