const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');
const UserMariaRepository = require('../models/mariadb/UserMariaRepository');

class UserController {
  constructor() {
    this.userService = new UserService(new UserMariaRepository());
  }

  async register(req, res, next) {
    try {
      const user = await this.userService.register(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          message: '회원가입 중 오류가 발생했습니다.',
          error: error.message 
        });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          message: '로그인 중 오류가 발생했습니다.',
          error: error.message 
        });
      }
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await this.userService.getProfile(req.user.id);
      res.json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          message: '프로필 조회 중 오류가 발생했습니다.',
          error: error.message 
        });
      }
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await this.userService.updateProfile(req.user.id, req.body);
      res.json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          message: '프로필 업데이트 중 오류가 발생했습니다.',
          error: error.message 
        });
      }
      next(error);
    }
  }
}

module.exports = new UserController(); 