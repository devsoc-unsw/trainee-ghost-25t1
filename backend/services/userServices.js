const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


/**
 * Handles user signup by validating input, checking for existing users,
 * hashing the password, then creating a jwt token
 *
 * @param {Object} userDetails - The user details for signup.
 * @param {string} userDetails.email - The email address of the user.
 * @param {string} userDetails.name - The name of the user.
 * @param {string} userDetails.password - The unhashed password of the user.
 * @returns {Promise<Object>} An object with the created user and a JWT token.
 * @throws {Error} A client side or backend realted error
 */

exports.signup = async ({email, name, password}) => {

    // Check if all necessary inputs exist
    if (!name || !email || !password) {
        const err = new Error('Email, name and password are required')
        err.code = 'INVALID_INPUT'
        throw err
    }

    // Remove any whitespace on the sides of non-password inputs
    name = name.trim();
    email = email.trim();

    // Make sure the user does not already exist
    const existing = await userModel.findByEmail(email)
    if (existing) {
        const err = new Error('User already exists')
        err.code = 'USER_EXISTS'
        throw err
    }
    
    // Hash the password
    hashedPassword  = await bcrypt.hash(password, 11)
    
    // Add the user to the database
    const user = await userModel.createUser({name, email, hashedPassword})
    
    // Generate a JSON Web Token
    const token = jwt.sign(
        // Payload of what the token should contain
        { email: email, name: name },
        JWT_SECRET,
        // The refresh time is kind of long for this project because security is
        // not really our main focus rn. We can change later though
        { expiresIn: '1h' }
    )
    return { user, token }
}