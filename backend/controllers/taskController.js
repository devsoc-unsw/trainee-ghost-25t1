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

exports.postTask = async (req, res) => {
    try {
        const taskData = await taskServices.postTask(req.user_id, req.body)
        return res.status(201).json({ success: true, data: taskData })
    } catch (err) {
        const status = errorMap[err.code]?.httpStatus || 500
        let message = err.message || 'Internal server error'

        return res.status(status).json({ success: false, error: message})
    }
}