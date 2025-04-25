const express = require('express')
const userController = require('../controllers/userController')
const router = express.router

// Login and signup are both post operations because you are creating a resource
// (your JSON Web Token)
router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router;