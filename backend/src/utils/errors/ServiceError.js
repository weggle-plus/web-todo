const { StatusCodes } = require('http-status-codes');
const { SERVICE_ERROR_MESSAGES } = require('../../constants/messages');

class ServiceError extends Error {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }

  // Todo
  /**
   * TODO가 존재하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 404 (NOT_FOUND)를 가진 ServiceError
   */
  static todoNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TODO.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  // User
  /**
   * 유저가 존재하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 404 (NOT_FOUND)를 가진 ServiceError
   */
  static userNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  /**
   * 유저 이름이 이미 존재하는 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static usernameAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.USER.USERNAME_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  /**
   * 유저가 해당 TODO에 속하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 403 (FORBIDDEN)를 가진 ServiceError
   */
  static todoNotBelongToUser() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TODO.NOT_BELONG_TO_USER, StatusCodes.FORBIDDEN);
  }

}

module.exports = ServiceError;