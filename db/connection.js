const mysql = require('mysql2');

require("dotenv").config();

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password:process.env.password,
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

connection.connect(function (err) {
    if (err) throw err
})

module.exports = connection