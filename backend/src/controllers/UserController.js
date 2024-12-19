const { StatusCodes } = require('http-status-codes');
const { body, param } = require('express-validator');
const UserService = require('../services/UserService');
const { UserRepositoryFactory } = require('../models/RepositoryFactory');
const { VALIDATION_ERROR_MESSAGES } = require('../constants/messages');
const validateRequest = require('../middleware/validateRequest');

class UserController {
  static userService = new UserService(UserRepositoryFactory.createRepository());

  static validateRegister = [
    body('username')
      .optional()
      .isString()
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED)
      .isLength({ min: 2, max: 30 })
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_LENGTH)
      .trim(),
    body('password')
      .isString()
      .isLength({ min: 8, max: 64 })
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_LENGTH)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_PATTERN),
    validateRequest
  ];

  static validateLogin = [
    body('username')
      .isString()
      .notEmpty()
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED),
    body('password')
      .isString()
      .notEmpty()
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_REQUIRED),
    validateRequest
  ];

  static validateUserIdParam = [
    param('id')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.USER_ID_INVALID)
      .toInt(),
    validateRequest
  ];

  static validateProfileUpdate = [
    body('username')
      .optional()
      .isString()
      .isLength({ min: 2, max: 30 })
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_LENGTH)
      .trim(),
    body('password')
      .optional()
      .isString()
      .isLength({ min: 8, max: 64 })
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_LENGTH)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
      .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_PATTERN),
    validateRequest
  ];

  static register = async (req, res, next) => {
    try {
      const user = await UserController.userService.register(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  static login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await UserController.userService.login(username, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static getProfile = async (req, res, next) => {
    try {
      const user = await UserController.userService.getProfile(req.user.id, req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static updateProfile = async (req, res, next) => {
    try {
      const user = await UserController.userService.updateProfile(req.user.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static logout = async (req, res, next) => {
    try {
      await UserController.userService.logout(req.user.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  static deleteProfile = async (req, res, next) => {
    try {
      await UserController.userService.deleteProfile(req.user.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController; 