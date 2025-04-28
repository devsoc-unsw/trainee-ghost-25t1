const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, taskController.getTaskData)

module.exports = router