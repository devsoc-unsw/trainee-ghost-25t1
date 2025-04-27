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
        return userData = taskService.getTaskData(req.user.id, req.query);
    } catch (err) {
        const status = errorMap[err.code]?.httpStatus || 500
        let message = err.message || 'Internal server error'

        return res.status(status).json({ success: false, error: message})
    }
}