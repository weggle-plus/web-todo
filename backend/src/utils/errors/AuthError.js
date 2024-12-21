const { StatusCodes } = require('http-status-codes');
const { AUTH_ERROR_MESSAGES } = require('../../constants/messages');

class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }

  /**
   * 인증 실패 에러
   * @returns {AuthError} 상태 코드 401 (UNAUTHORIZED)를 가진 AuthError
   */
  static unauthorized() {
    return new AuthError(AUTH_ERROR_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  /**
   * 토큰이 유효하지 않은 경우 에러
   * @returns {AuthError} 상태 코드 401 (UNAUTHORIZED)를 가진 AuthError
   */
  static invalidToken() {
    return new AuthError(AUTH_ERROR_MESSAGES.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
  }

  /**
   * 권한이 없는 경우 에러
   * @returns {AuthError} 상태 코드 403 (FORBIDDEN)를 가진 AuthError
   */
  static forbidden() {
    return new AuthError(AUTH_ERROR_MESSAGES.FORBIDDEN, StatusCodes.FORBIDDEN);
  }

  /**
   * 유저 이름이 이미 존재하는 경우 에러
   * @returns {AuthError} 상태 코드 409 (CONFLICT)를 가진 AuthError
   */
  static usernameAlreadyExists() {
    return new AuthError(AUTH_ERROR_MESSAGES.USERNAME_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }


  static invalidUsernameOrPassword() {
    return new AuthError(AUTH_ERROR_MESSAGES.INVALID_USERNAME_OR_PASSWORD, StatusCodes.UNAUTHORIZED);
  }

}

module.exports = AuthError;
