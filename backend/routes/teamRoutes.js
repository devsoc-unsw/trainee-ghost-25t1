const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken');

const teamController = require('../controllers/teamController');

router.post('/', verifyToken, teamController.createTeam)
router.post('/join/:randomCode', verifyToken, teamController.joinTeam)

// Route stuff

module.exports = router;