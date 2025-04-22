const db = require('../config/db.js')

/**
 * Fetches a user by their email address.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object|null>} Resolves with the user record or null if not
 * found.
 */

exports.findByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`
    const [rows] = await db.query(query, [email]);
    // Return the first row or null if nothing was found
    return rows.length ? rows[0] : null;
}

/**
 * Inserts a new user into the database.
 * @param {Object} params
 * @param {string} params.name - The user's full name.
 * @param {string} params.email - The user's email address.
 * @param {string} params.hashedPassword - The bcrypt-hashed password.
 * @returns {Promise<Object>} Resolves with an object containing the new user's
 * id, name, and email.
 */

exports.createUser = async ({name, email, hashedPassword}) => {
    const query = `
        INSERT INTO users
        (name, email, hashed_password)
        VALUES (?, ?, ?)`

    const [result] = await db.query(query, [name, email, hashedPassword]);
    return {id: result.insertId, name, email}

}

