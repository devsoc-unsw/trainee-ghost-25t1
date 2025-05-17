const pokeConstants = require("../constants/pokeConstants.js");

// Determines the level of a pokemon based on how much xp they have
const levelFromXp = (xp) => {
  return Math.floor(Math.cbrt(xp));
};

// Determines how many XP points a given task should provide
const taskDifficultyToXp = (difficulty) => {
  return difficulty * pokeConstants.difficultyToXpMultiple;
};

// Calculates the stats of a pokemon based on XP
// 
const levelToStatObj = async (pokemonName, level) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const data = await response.json();
  const baseStatsArr = data.stats.map((obj) => [
    obj.stat.name,
    obj.stat.base_stat,
  ]);

  const newStats = {};
  const { maxLevel, flatHealthBonus, flatNonHealthBonus } = pokeConstants;
  for (const [statName, base] of baseStatsArr) {
    const bonus = statName === "hp" ? flatHealthBonus : flatNonHealthBonus;
    newStats[statName] = Math.floor((base * level) / maxLevel + bonus);
  }

  return newStats;
};

module.exports = {
  levelFromXp,
  taskDifficultyToXp,
  levelToStatObj,
};
