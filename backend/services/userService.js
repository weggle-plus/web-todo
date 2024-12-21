const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const signupService = (username, password) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        let values = [username, password];

        conn.query(sql, values, 
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};

const loginService = (username, password) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        let values = [username, password];

        conn.query(sql, values, 
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                if(results.length === 0) {
                    return reject(new Error('unauthorized'));
                }
                const token = jwt.sign(
                    {username: username},
                    process.env.PRIVATE_KEY,
                    {expiresIn: '10min', issuer: 'todo'}
                );

                resolve(token);
            }
        );
    });
};

module.exports = {
    signupService, 
    loginService
};