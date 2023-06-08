// Create a connection to the database
const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST, //localhost
    user: process.env.DB_USER, //root
    password: process.env.DB_PASSWORD, //password
    database: process.env.DB,
});
connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected!');
});
module.exports = connection;