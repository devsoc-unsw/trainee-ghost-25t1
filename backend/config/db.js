// We get the promise version of MySQL to stay away from callback hell. You will
// thank me later

const mysql = require('mysql2/promise')
require ('dotenv').config()


let connection;

(async function initDB() {
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        console.log('Successfully connected to MySQL')
    } catch (error) {
        console.error('Error connecting to MySQL: ', err)
    }
})

 module.exports = db;