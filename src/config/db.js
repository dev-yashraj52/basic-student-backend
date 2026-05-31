const mysql = require("mysql2");
require('dotenv').config({ path: './.env' })

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_STUDENT_NAME
});


db.connect((err) => {
    if (err) {
        console.log(`Database Error: ${err}`);
        return;
    }
    console.log("Connected to MySql Database!")
});


module.exports = db;