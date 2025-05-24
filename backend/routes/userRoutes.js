const express = require('express')
const userController = require('../controllers/userController');
const router = express.Router()

const { verifyToken } = require('../middleware/verifyToken');

// Login and signup are both post operations because you are creating a resource
// (your JSON Web Token)
router.post('/signup', userController.signup);
router.post('/login', userController.login);
// Route to fetch data about yourself from sql
router.get('/self', verifyToken, userController.getSelf);
// Close your notification panel in homepage
router.delete('/notifications', verifyToken, userController.closeNotification)

module.exports = router;