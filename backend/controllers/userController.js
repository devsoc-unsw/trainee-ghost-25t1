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

const signup = async (req, res) => {

    const { name, email, password } = req.body
    
    try {
        const { user, token } = await userServices.signup({email, name, password})

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 2147483647
        });

        return res.status(201).json({ success: true, user})
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

const login = async (req, res) => {
    const { email, password }  = req.body;
    
    try {
        const { user, token } = await userServices.login({email, password})

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 2147483647
        });

        return res.status(201).json({ success: true, user})
    } catch (err) {
        console.error("Error logging in: ", err)
        let status = errorMap[err.code]?.httpStatus || 500;
        let message = err.message || "Internal server error"
        
        return res.status(status).json({ success: false, error: message })
    }
}

const getSelf = async (req, res) => {
    try {
        const user = await userServices.getUser(req.user.id)
        return res.status(200).json({ success: true, user: user})
    } catch (err) {
        console.error("Error logging in: ", err)
        let status = errorMap[err.code]?.httpStatus || 500;
        let message = err.message || "Internal server error"
        
        return res.status(status).json({ success: false, error: message })
    }
}

module.exports = { signup, login, getSelf }