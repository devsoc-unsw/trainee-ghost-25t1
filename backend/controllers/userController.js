const errorMap = require('../constants/errorMap')
const userServices = require('../services/userServices')

/**
 * Attempts to add a user to a database then returns a JSON Web Token that will
 * allow them to login
 * @param {Object} req - The request object of the user containing user data
 * @param {string} req.body.name - The username of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The unhashed password of the user.
 * @param {Object} res - The response object
 * @returns 
 */

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    
    try {
        const { user, token } = await userServices.signup({email, name, password})
        return res.status(201).json({ success: true, user, token})
    } catch (err) {
        console.error("Error signing up:, ", err)
        let status = errorMap[err.code]?.httpStatus || 500;
        let message = err.message || "Internal server error"

        return res.status(status).json({ success: false, error: message })
    }
}


/**
 * Logs in a user by validating their credentials and returns a JSON Web Token.
 * @param {Object} req - The request object containing user credentials.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The unhashed password of the user.
 * @param {Object} res - The response object
 * @returns {Promise<void>} Sends a JSON response with the user and token on
 * success or an error message.
 */

exports.login = async (req, res) => {
    const { email, password }  = req.body;
    
    try {
        const { user, token } = await userServices.login({email, password})
        return res.status(201).json({ success: true, user, token})
    } catch (err) {
        console.error("Error logging in: ", err)
        let status = errorMap[err.code]?.httpStatus || 500;
        let message = err.message || "Internal server error"
        
        return res.status(status).json({ success: false, error: message })
    }
}