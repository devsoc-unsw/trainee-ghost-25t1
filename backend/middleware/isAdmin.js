const db = require("../config/db.js");

// Check if a user is an admin. This function most be called after verifyToken
// A user can only be an admin of one team so we just need to check there exists
// a team they are an admin.
exports.isAdmin = async (req, res, next) => {
    const query = `
        SELECT 1 FROM teams
        WHERE admin_user_id = ?
        LIMIT 1
    `;
    const params = req.user.id;

    const [rows] = await db.query(query, params);
    if (rows.length > 0) {
        next()
    } else {
        const err = new Error('User is not an admin')
        err.code = 'USER_NOT_ADMIN';
        throw err;
    }
}
