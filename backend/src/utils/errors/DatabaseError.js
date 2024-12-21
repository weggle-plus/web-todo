const { StatusCodes } = require('http-status-codes');
const { DATABASE_ERROR_MESSAGES } = require('../../constants/messages');

class DatabaseError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = statusCode;
  }
  // Todo
  /**
   * TODO 업데이트 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static todoUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TODO.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  /**
   * TODO 삭제 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static todoDeleteFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TODO.DELETE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  // User
  /**
   * 유저 업데이트 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static userUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.USER.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  /**
   * 유저 삭제 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static userDeleteFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.USER.DELETE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  // Team
  /**
   * 팀 업데이트 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static teamUpdateFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TEAM.UPDATE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }

  /**
   * 팀 삭제 실패 에러
   * @returns {DatabaseError} 상태 코드 500 (INTERNAL_SERVER_ERROR)를 가진 DatabaseError
   */
  static teamDeleteFailed() {
    return new DatabaseError(DATABASE_ERROR_MESSAGES.TEAM.DELETE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = DatabaseError;