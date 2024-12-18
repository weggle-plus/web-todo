const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');
const { UserRepositoryFactory } = require('../models/RepositoryFactory');
const { ERROR_MESSAGES } = require('../constants/messages');

class UserController {
  constructor() {
    this.userService = new UserService(UserRepositoryFactory.createRepository());
  }

  async register(req, res, next) {
    try {
      const user = await this.userService.register(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          message: ERROR_MESSAGES.USER.REGISTER,
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
          message: ERROR_MESSAGES.USER.LOGIN,
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
          message: ERROR_MESSAGES.USER.READ,
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
          message: ERROR_MESSAGES.USER.UPDATE,
          error: error.message 
        });
      }
      next(error);
    }
  }
}

module.exports = new UserController(); 