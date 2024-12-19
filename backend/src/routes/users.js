const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth.middleware');
const { validateLogin, validateUserIdParam, validateProfile } = require('../middleware/validateRequest');


router.post('/register', 
  validateProfile, 
  async (req, res, next) => {
    await UserController.register(req, res, next);
  }
);

router.post('/login', 
  validateLogin, 
  async (req, res, next) => {
    await UserController.login(req, res, next);
  }
);

router.use(authMiddleware.authenticate);

router.get('/:id', 
  validateUserIdParam,
  async (req, res, next) => {
    await UserController.getProfile(req, res, next);
  }
);

router.put('/', 
  validateProfile, 
  async (req, res, next) => {
    await UserController.updateProfile(req, res, next);
  }
);

router.delete('/:id', 
  validateUserIdParam,
  async (req, res, next) => {
    await UserController.deleteProfile(req, res, next);
  }
);

module.exports = router;
