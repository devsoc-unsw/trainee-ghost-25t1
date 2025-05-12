const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken');

const teamController = require('../controllers/teamController');

router.post('/', verifyToken, teamController.createTeam)

// Route stuff

module.exports = router;