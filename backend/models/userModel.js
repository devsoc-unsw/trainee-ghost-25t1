const db = require('../config/db.js')

exports.findByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`
    const result = await db.query(query, [email]);
    return result[0];
}

exports.createUser = async ({name, email, password}) => {
    const query = `
        INSERT INTO users
        (name, email, hashed_password)
        VALUES (?, ?, ?)`

    return await db.query(query, [name, email, password]);

}

