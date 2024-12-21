const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth.middleware');
const { validateRegister, validateLogin, validateUserIdParam, validateProfile, validateUsername } = require('../middleware/validateRequest');

// 회원가입
router.post('/register', 
  validateRegister, 
  async (req, res, next) => {
    await UserController.register(req, res, next);
  }
);

// 유저 이름 중복 체크
router.get('/check-username', 
  validateUsername, 
  async (req, res, next) => {
    await UserController.checkUsername(req, res, next);
  }
);

// 로그인
router.post('/login', 
  validateLogin, 
  async (req, res, next) => {
    await UserController.login(req, res, next);
  }
);

router.use(authMiddleware.authenticate);

// 프로필 조회
router.get('/:id', 
  validateUserIdParam,
  async (req, res, next) => {
    await UserController.getProfile(req, res, next);
  }
);

// 프로필 업데이트
router.put('/', 
  validateProfile, 
  async (req, res, next) => {
    await UserController.updateProfile(req, res, next);
  }
);

// 프로필 삭제
router.delete('/:id', 
  validateUserIdParam,
  async (req, res, next) => {
    await UserController.deleteProfile(req, res, next);
  }
);

module.exports = router;
