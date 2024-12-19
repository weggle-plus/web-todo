const { StatusCodes } = require('http-status-codes');
const { AUTH_ERROR_MESSAGES } = require('../../constants/messages');

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }

  static unauthorized() {
    return new AuthError(AUTH_ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  static invalidToken() {
    return new AuthError(AUTH_ERROR_MESSAGES.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }

  static forbidden() {
    return new AuthError(AUTH_ERROR_MESSAGES.FORBIDDEN, StatusCodes.FORBIDDEN);
  }
}

module.exports = AuthError;
