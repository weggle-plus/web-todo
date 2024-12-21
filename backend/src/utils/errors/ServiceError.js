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

  // Team
  /**
   * 팀이 존재하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 404 (NOT_FOUND)를 가진 ServiceError
   */
  static teamNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  /**
   * 팀 이름이 이미 존재하는 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static teamNameAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.NAME_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  /**
   * 팀 멤버가 존재하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 404 (NOT_FOUND)를 가진 ServiceError
   */
  static teamMemberNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  /**
   * 팀 멤버 제한 초과 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static teamLimitExceeded() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.LIMIT_EXCEEDED, StatusCodes.CONFLICT);
  }

  /**
   * 자기 자신을 초대할 수 없는 경우 에러
   * @returns {ServiceError} 상태 코드 400 (BAD_REQUEST)를 가진 ServiceError
   */
  static cannotInviteSelf() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.CANNOT_INVITE_SELF, StatusCodes.BAD_REQUEST);
  }

  /**
   * 초대 이미 존재하는 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static invitationAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVITATION_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  /**
   * 초대가 존재하지 않는 경우 에러
   * @returns {ServiceError} 상태 코드 404 (NOT_FOUND)를 가진 ServiceError
   */
  static invitationNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVITATION_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  /**
   * 팀 멤버가 이미 존재하는 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static teamMemberAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  /**
   * 팀 멤버 액션이 유효하지 않은 경우 에러
   * @returns {ServiceError} 상태 코드 400 (BAD_REQUEST)를 가진 ServiceError
   */
  static invalidTeamMemberAction() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVALID_TEAM_MEMBER_ACTION, StatusCodes.BAD_REQUEST);
  }

  /**
   * 팀 멤버 제한 초과 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static teamMemberLimitExceeded() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_LIMIT_EXCEEDED, StatusCodes.CONFLICT);
  }

  /**
   * 팀 역할이 유효하지 않은 경우 에러
   * @returns {ServiceError} 상태 코드 400 (BAD_REQUEST)를 가진 ServiceError
   */
  static invalidTeamRole() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVALID_TEAM_ROLE, StatusCodes.BAD_REQUEST);
  }

  /**
   * 팀에 멤버가 존재하는 경우 에러
   * @returns {ServiceError} 상태 코드 409 (CONFLICT)를 가진 ServiceError
   */
  static teamHasMembers() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.HAS_MEMBERS, StatusCodes.CONFLICT);
  }
}

module.exports = ServiceError;