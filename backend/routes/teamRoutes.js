const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/isAdmin');

const teamController = require('../controllers/teamController');

router.post('/', verifyToken, teamController.createTeam);
router.get('/settings', verifyToken, teamController.viewTeamSettings);
router.post('/join/:randomCode', verifyToken, teamController.joinTeam);
router.delete('/leave', verifyToken, teamController.leaveTeam);
router.delete('/kick/:kickedId', verifyToken, teamController.kickFromTeam);
router.patch('/randomCode', verifyToken, isAdmin, teamController.changeTeamCode);
router.patch('/', verifyToken, isAdmin, teamController.alterCoreTeamData);
router.get('/randomCode', verifyToken, isAdmin, teamController.getJoinCode);
router.get('/home', verifyToken, teamController.getHomePage);
// Route stuff

module.exports = router;