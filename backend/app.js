const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

// Configure our middleware

// We need cors (Cross origin resource requests) for development at least
// because we will locally host the backend and frontend on different ports
app.use(cors())
// Middleware for parsing JSON payloads available on req.body
app.use(express.json())

// We can configure our base routes here
// e.g. /users, /settings, /posts /replies.
// We might want to prefix this with something like /api so it is /api/users
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

module.exports = app;