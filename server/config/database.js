const mysql = require('mysql2/promise')
require('dotenv').config()
//configure db connection - to be moved

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

//Test db connection and handle database connection errors
pool.getConnection((err, connection) => {
    if (err) {
        console.log(`Connection error: ${err}`)
    }
    console.log('Connected to Mysql database')
    connection.release()
});

module.exports = pool