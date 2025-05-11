const taskServices = require("../services/taskServices")
const errorMap = require("../constants/errorMap");

// A flexible function for getting data realted to tasks. Only fetches tasks
// of a team that the user is in
exports.getTaskData = async (req, res) => {
    try {
        const user_data = await taskServices.getTaskData(req.user.id, req.query)
        return res.status(200).json({ success: true, data: user_data})
    } catch (err) {
        const status = errorMap[err.code]?.httpStatus || 500
        let message = err.message || 'Internal server error'

        return res.status(status).json({ success: false, error: message})
    }
}

/**
 * Post a task and attach it to a users team
 * @param {string} req.body.title - The title of the task
 * @param {string} req.body.description - A text description of the task
 * @param {number} req.body.difficulty - The difficulty of the task from 1-10
 * @param {string date} req.body.dueDate - When the task is due
 * @param {number[]} req.body.assignedTo - Who needs to do the task
 */
exports.postTask = async (req, res) => {
    try {
        const post_data = await taskServices.postTask(req.user_id, req.body)
        return res.status(200).json({ success: true, /** Add data here */ })
    } catch (err) {
        const status = errorMap[err.code]?.httpStatus || 500
        let message = err.message || 'Internal server error'

        return res.status(status).json({ success: false, error: message})
    }
}