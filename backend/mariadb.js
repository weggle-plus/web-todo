const mariadb = require('mysql2');
const dotenv = require('dotenv').config();

const connection = mariadb.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'Todo',
    port: process.env.DB_PORT,
    dateStrings: true
});

module.exports = connection;