const extractStatsFromHomeData = (homeData) => {
    if (homeData?.team?.team) {
        const team = homeData.team.team;
        const obj = {
            "Health Points": team?.hp,
            "Attack": team?.attack,
            "Defense": team?.defense,
            "Special Attack": team?.special_attack,
            "Special Defense": team?.special_defense,
            "Speed": team?.speed,
            "Experience Points": team?.xp % 100
        }
        return obj;
    }
    return null;
}

export default extractStatsFromHomeData