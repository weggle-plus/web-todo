const {body} = require('express-validator');

const validateSignup = [
    body('username').notEmpty().withMessage('signup validation error - username'),
    body('password').notEmpty().withMessage('signup validation error - password')
];

const validateLogin = [
    body('username').notEmpty().withMessage('login validation error - username'),
    body('password').notEmpty().withMessage('login validation error - password')
]

module.exports = {
    validateSignup,
    validateLogin
}