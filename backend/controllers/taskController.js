const taskServices = require("../services/taskServices")
const errorMap = require("../constants/errorMap");

/**
 * A flexible function for getting data related to a tasks. Only fetches tasks
 * when a user is in the the team that task is connected with
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object
 * @returns {Promise<void>} Sends a JSON response with the task data and success
 * or an error message
 */

exports.getTaskData = async (req, res) => {
    try {
        const user_data =  taskServices.getTaskData(req.user.id, req.query)
        return res.status(200).json({ success: true, data: user_data})
    } catch (err) {
        const status = errorMap[err.code]?.httpStatus || 500
        let message = err.message || 'Internal server error'

        return res.status(status).json({ success: false, error: message})
    }
}