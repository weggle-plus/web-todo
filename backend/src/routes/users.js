const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/register', async (req, res, next) => {
  await UserController.register(req, res, next);
});

router.post('/login', async (req, res, next) => {
  await UserController.login(req, res, next);
});

router.get('/profile', authenticate, async (req, res, next) => {
  await UserController.getProfile(req, res, next);
});

router.put('/profile', authenticate, async (req, res, next) => {
  await UserController.updateProfile(req, res, next);
});

module.exports = router;
