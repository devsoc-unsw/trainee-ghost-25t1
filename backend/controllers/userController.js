const userServices = require('../services/userServices')


/**
 * Attempts to add a user to a database then returns a JSON Web Token that will
 * allow them to login
 * @param {*} req - The request object of the user
 * @param {*} res 
 * @returns 
 */

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    
    try {
        const {user, token} = await userServices.signup({email, name, password})
        return res.status(201).json({ success: true, user, token})
    } catch (err) {
        console.error("Error signing up:, ", err)
        // Default status and message
        let status = 500;
        let message = "Internal server error"

        if (err.code === 'INVALID_INPUT') {
            status = 400
        } else if (err.code === "USER_EXISTS") {
            status = 409
            message = err.message
        }
        return res.status(status).json({ success: false, error: message })
    }
}