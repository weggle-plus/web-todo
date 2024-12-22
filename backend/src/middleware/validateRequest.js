const { body, param, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { VALIDATION_ERROR_MESSAGES } = require("../constants/messages");
const constants = require("../constants/constants");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((err) => err.msg)
      .join(" ");
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages });
  }
  next();
};

const validateTodo = [
  body("title")
    .isString()
    .notEmpty()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_REQUIRED)
    .isLength({ max: constants.TODO_TITLE_MAX_LENGTH })
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_TOO_LONG),
  body("content")
    .optional()
    .isString()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.CONTENT_INVALID),
  body("status")
    .optional()
    .isIn(Object.values(constants.TODO_STATUS))
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
  validateRequest,
];

const validateTodoStatus = [
  body("status")
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_REQUIRED)
    .isIn(Object.values(constants.TODO_STATUS))
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
  validateRequest,
];

const validateTodoIdParam = [
  param("id").isInt().withMessage(VALIDATION_ERROR_MESSAGES.TODO.ID_INVALID),
  validateRequest,
];

const validateProfile = [
  body("username")
    .optional()
    .isString()
    .isLength({
      min: constants.USERNAME_MIN_LENGTH,
      max: constants.USERNAME_MAX_LENGTH,
    })
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_LENGTH)
    .trim(),
  body("password")
    .optional()
    .isString()
    .isLength({
      min: constants.PASSWORD_MIN_LENGTH,
      max: constants.PASSWORD_MAX_LENGTH,
    })
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_LENGTH)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_PATTERN),
  validateRequest,
];

const validateUsername = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED),
  validateRequest,
];

const validateLogin = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USERNAME_REQUIRED),
  body("password")
    .isString()
    .notEmpty()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.PASSWORD_REQUIRED),
  validateRequest,
];

const validateUserIdParam = [
  param("id")
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.USER.USER_ID_INVALID)
    .toInt(),
  validateRequest,
];

const validateTeam = [
  body("name")
    .isString()
    .notEmpty()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.NAME_REQUIRED)
    .isLength({
      min: constants.TEAM_NAME_MIN_LENGTH,
      max: constants.TEAM_NAME_MAX_LENGTH,
    })
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.NAME_LENGTH),
  body("description")
    .optional()
    .isString()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.DESCRIPTION_INVALID),
  validateRequest,
];

const validateTeamIdParam = [
  param("teamId")
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.TODO.ID_INVALID),
  validateRequest,
];

const validateMemberRole = [
  body("role")
    .optional()
    .isIn(Object.values(constants.TEAM_MEMBER_ROLES))
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID),
  validateRequest,
];

const validateMember = [
  body("userId")
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ID_INVALID),
  body("role")
    .optional()
    .isIn(Object.values(constants.TEAM_MEMBER_ROLES))
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID),
  validateRequest,
];

const validateInvitation = [
  param("inviteeId")
    .isInt()
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.INVITEE_ID_INVALID),
  body("message")
    .optional()
    .isString()
    .trim()
    .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.INVITATION_MESSAGE_INVALID),
  validateRequest,
];

module.exports = {
  validateTodo,
  validateTodoStatus,
  validateTodoIdParam,
  validateLogin,
  validateUsername,
  validateUserIdParam,
  validateProfile,
  validateTeam,
  validateTeamIdParam,
  validateMember,
  validateMemberRole,
  validateInvitation,
};
