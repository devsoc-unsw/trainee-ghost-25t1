const pokeConstants = require("../constants/pokeConstants.js");

// Determines the level of a pokemon based on how much xp they have
const levelFromXp = (xp) => {
  return Math.floor(xp / 100);
};

// Determines how many XP points a given task should provide
const taskDifficultyToXp = (difficulty) => {
  return difficulty * pokeConstants.difficultyToXpMultiple;
};

// Get a random xp for a pokemon to start at
const getStartingXp = () => {
  const { minStartLevel, maxStartLevel } = pokeConstants;
  const range = maxStartLevel - minStartLevel;
  const xp = Math.floor(Math.random() * range * 100 + 1) + minStartLevel * 100;
  return xp;
}

const fetchPokemon = async (pokeName) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.code = "INVALID_POKEMON";
    throw err;
  }
  const data = await res.json();
  return data;
};

const getBaseStats = async (pokeName) => {
  const pokemon = await fetchPokemon(pokeName);
  const baseStatsArr = pokemon.stats.map((obj) => [
    obj.stat.name.replace("-", "_"), // Convert to snake case for db (pokeapi uses special-attack instead of special_attack)
    obj.base_stat,
  ]);
  return Object.fromEntries(baseStatsArr);
};

// Calculates the stats of a pokemon based on XP
const levelToStatObj = async (pokeName, level) => {
  statObj = getBaseStats(pokeName);

  const newStats = {};
  const { maxLevel, flatHealthBonus, flatNonHealthBonus } = pokeConstants;

  // Calculate the appropriate stats
  for (const [statName, base] of Object.entries(statObj)) {
    const bonus = statName === "hp" ? flatHealthBonus : flatNonHealthBonus;
    const numerator = (2 * base + 39) * level;
    newStats[statName] = Math.floor(numerator / maxLevel + bonus);
  }

  return newStats;
};

module.exports = {
  levelFromXp,
  taskDifficultyToXp,
  levelToStatObj,
  getBaseStats,
  fetchPokemon,
  getStartingXp
};
