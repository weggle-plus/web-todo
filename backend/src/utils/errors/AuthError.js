const { StatusCodes } = require("http-status-codes");
const { AUTH_ERROR_MESSAGES } = require("../../constants/messages");

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }

  static invalidUsernameOrPassword() {
    return new AuthError(
      AUTH_ERROR_MESSAGES.INVALID_USERNAME_OR_PASSWORD,
      StatusCodes.UNAUTHORIZED
    );
  }

  static unauthorized() {
    return new AuthError(
      AUTH_ERROR_MESSAGES.UNAUTHORIZED,
      StatusCodes.UNAUTHORIZED
    );
  }

  static invalidToken() {
    return new AuthError(
      AUTH_ERROR_MESSAGES.INVALID_TOKEN,
      StatusCodes.UNAUTHORIZED
    );
  }

  static expiredToken() {
    return new AuthError(
      AUTH_ERROR_MESSAGES.EXPIRED_TOKEN,
      StatusCodes.UNAUTHORIZED
    );
  }

  static forbidden() {
    return new AuthError(AUTH_ERROR_MESSAGES.FORBIDDEN, StatusCodes.FORBIDDEN);
  }

  static notTeamMember() {
    return new AuthError(
      AUTH_ERROR_MESSAGES.NOT_TEAM_MEMBER,
      StatusCodes.FORBIDDEN
    );
  }
}

module.exports = AuthError;
