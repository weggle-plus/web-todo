const { VALIDATION_ERROR_MESSAGES } = require('../../constants/messages');


class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }

  // Todo
  static todoTitleRequired() {
    return new Error(VALIDATION_ERROR_MESSAGES.TODO.TITLE_REQUIRED);
  }

  static todoStatusInvalid() {
    return new Error(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID);
  }

  static todoNotFound() {
    return new Error(VALIDATION_ERROR_MESSAGES.TODO.NOT_FOUND);
  }

  // User
  static emailAlreadyExists() {
    return new Error(VALIDATION_ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS);
  }

  static invalidEmailOrPassword() {
    return new Error(VALIDATION_ERROR_MESSAGES.USER.INVALID_EMAIL_OR_PASSWORD);
  }

  static inactiveAccount() {
    return new Error(VALIDATION_ERROR_MESSAGES.USER.INACTIVE_ACCOUNT);
  }

  static userNotFound() {
    return new Error(VALIDATION_ERROR_MESSAGES.USER.NOT_FOUND);
  }

  // Team
  static teamNotFound() {
    return new Error(VALIDATION_ERROR_MESSAGES.TEAM.NOT_FOUND);
  }

  static teamNameAlreadyExists() {
    return new Error(VALIDATION_ERROR_MESSAGES.TEAM.NAME_ALREADY_EXISTS);
  }

  static teamMemberAlreadyExists() {
    return new Error(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ALREADY_EXISTS);
  }

  static teamMemberRoleInvalid() {
    return new Error(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID);
  }
}

module.exports = ValidationError;