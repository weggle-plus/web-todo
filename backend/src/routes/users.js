const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate, validatePassword } = require('../middleware/auth.middleware');

router.post('/register', validatePassword, async (req, res, next) => {
  await UserController.register(req, res, next);
});

router.post('/login', validatePassword, async (req, res, next) => {
  await UserController.login(req, res, next);
});

router.get('/profile', authenticate, async (req, res, next) => {
  await UserController.getProfile(req, res, next);
});

router.put('/profile', authenticate, async (req, res, next) => {
  await UserController.updateProfile(req, res, next);
});

module.exports = router;
