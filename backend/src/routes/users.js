const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', 
  UserController.validateRegister, 
  async (req, res, next) => {
    await UserController.register(req, res, next);
  }
);

router.post('/login', 
  UserController.validateLogin, 
  async (req, res, next) => {
    await UserController.login(req, res, next);
  }
);

router.use(authMiddleware.authenticate);

router.get('/:id', 
  UserController.validateUserId,
  async (req, res, next) => {
    await UserController.getProfile(req, res, next);
  }
);

router.put('/:id', 
  UserController.validateUserId,
  UserController.validateProfileUpdate, 
  async (req, res, next) => {
    await UserController.updateProfile(req, res, next);
  }
);

router.delete('/:id', 
  UserController.validateUserId,
  async (req, res, next) => {
    await UserController.deleteProfile(req, res, next);
  }
);

module.exports = router;
