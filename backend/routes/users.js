const {signup, login} = require('../controller/usersController');
const express = require('express');
const { validateSignup, validateLogin } = require('../validator/userValidator');
const router = express.Router();

router.use(express.json())

//signup
router.post('/signup', validateSignup, signup);

//login
router.post('/login', validateLogin, login);

module.exports = router;
