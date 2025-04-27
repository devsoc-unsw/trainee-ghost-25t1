// We may change this later to be something where it stores both exact columns
// as well as other ways of fetching data. For example, you might also be
// allowed to fetch all of the people a task is assigned too. So the object
// could become something like
// {
//     users: {
//         cols: {
//             the cols
//         },
//         other: {
//             users assigned
//         }
//     }
// }

const sqlColumns = {
    users: [
        "id",
        "name",
        "email",
        "hashed_password",
        "created_at",
        "team_id"
    ],
    teams: [
        "id",
        "name",
        "admin_user_id",
        "class_code",
        "assignment",
        "xp",
        "hp",
        "attack",
        "defence",
        "sp_attack",
        "sp_defense",
        "speed",
        "pokemon_name"
    ]
};

module.exports = { sqlColumns };