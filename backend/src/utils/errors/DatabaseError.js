const { StatusCodes } = require('http-status-codes');
const { DATABASE_ERROR_MESSAGES } = require('../../constants/messages');

class DatabaseError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = statusCode;
  }
  // Todo
  static todoUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TODO.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  // User
  static userUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.USER.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  // Team
  static teamUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TEAM.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = DatabaseError;