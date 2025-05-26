const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

// Configure our middleware

// We need cors (Cross origin resource requests) for development at least
// because we will locally host the backend and frontend on different ports
const corsOptions = {
    origin: ['https://williammilletwebsite.site', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}
app.use(cors(corsOptions));

// Middleware for parsing JSON payloads available on req.body
app.use(express.json())
app.use(cookieParser())

// We can configure our base routes here
// e.g. /users, /settings, /posts /replies.
// We might want to prefix this with something like /api so it is /api/users
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);

// Test route

app.get('/', (req, res) => {
    res.send('API is running')
})

module.exports = app;