const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', verifyToken, taskController.getTaskData);
router.post('/', verifyToken, taskController.postTask);

module.exports = router;