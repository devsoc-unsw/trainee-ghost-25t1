const teamModel = require('../models/teamModel');
const pokeUtils = require('../utils/pokeUtils');

// Add the xp to a team after completing a given task, and handle the effects
// associated with this
const addTaskCompletionXp = async (teamId, taskDifficulty) => {
  const xpGained = pokeUtils.taskDifficultyToXp(taskDifficulty);
  await teamModel.changeTeamData(teamId, )
  
}
module.exports = {
    addTaskCompletionXp
}