const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


const signup = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
    }

    let {username, password} = req.body;

    let sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    let values = [username, password];

    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                return res.status(StatusCodes.CREATED).json({
                    username: username
                });
            }
        }
    );
};

const login = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
    }
    
    let {username, password} = req.body;

    let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    let values = [username, password];

    conn.query(sql, values,
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } else {
                if(results.length === 0){
                    return res.status(StatusCodes.UNAUTHORIZED).end();
                } else {
                    const token = jwt.sign({
                        username: username
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '30m',
                        issuer: 'todo'
                    });
                    
                    res.cookie('token', token, {
                        httpOnly: true
                    });

                    return res.status(StatusCodes.OK).json({
                        token: token
                    });
                }
            }
        }
    );

};

module.exports = {
    signup,
    login
}