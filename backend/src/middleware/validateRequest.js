const { body, param, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { VALIDATION_ERROR_MESSAGES } = require('../constants/messages');
const constants = require('../constants/constants');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};


const validateTodo = [
  body('title')
    .isString()
    .notEmpty()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_REQUIRED)
    .isLength({ max: constants.TODO_TITLE_MAX_LENGTH })
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_TOO_LONG),
  body('content')
    .optional()
    .isString()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.CONTENT_INVALID),
  body('status')
    .optional()
    .isIn(Object.values(constants.TODO_STATUS))
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
  validateRequest
];

const validateTodoStatus = [
  body('status')
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_REQUIRED)
    .isIn(Object.values(constants.TODO_STATUS))
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
  validateRequest
];

const validateTodoIdParam = [
  param('id')
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.ID_INVALID),
  validateRequest
];

const validateRegister = [
  body('username')
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED),
  body('password')
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_REQUIRED)
    .isLength({ min: constants.PASSWORD_MIN_LENGTH, max: constants.PASSWORD_MAX_LENGTH })
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_LENGTH)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_PATTERN),
  validateRequest
];

const validateProfile = [
  body('username')
    .optional()
    .isString()
    .isLength({ min: constants.USERNAME_MIN_LENGTH, max: constants.USERNAME_MAX_LENGTH })
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_LENGTH)
    .trim(),
  body('password')
    .optional()
    .isString()
    .isLength({ min: constants.PASSWORD_MIN_LENGTH, max: constants.PASSWORD_MAX_LENGTH })
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_LENGTH)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_PATTERN),
  validateRequest
];

const validateUsername = [
  body('username')
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED),
  validateRequest
];

const validateLogin = [
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

const validateUserIdParam = [
  param('id')
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USER_ID_INVALID)
    .toInt(),
  validateRequest
];




module.exports = {
  validateTodo,
  validateTodoStatus,
  validateRegister,
  validateTodoIdParam,
  validateLogin,
  validateUsername,
  validateUserIdParam,
  validateProfile
};