const {signup, login} = require('../controllers/userController');
const express = require('express');
const {body} = require('express-validator');
const {checkValidateError} = require('../middleware/validator');
const router = express.Router();

router.use(express.json())

//signup
router.post('/signup', [
    body('username').notEmpty().withMessage('signup validation error - username'),
    body('password').notEmpty().isLength({min: 6, max: 255}).withMessage('signup validation error - password'),
    checkValidateError
], signup);

//login
router.post('/login', [
    body('username').notEmpty().withMessage('login validation error - username'),
    body('password').notEmpty().withMessage('login validation error - password'),
    checkValidateError
], login);

module.exports = router;
