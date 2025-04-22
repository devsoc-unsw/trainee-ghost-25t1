// We get the promise version of MySQL to stay away from callback hell. You will
// thank me later

const mysql = require('mysql2/promise')
require ('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  })
  
  module.exports = pool