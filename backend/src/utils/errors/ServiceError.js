const { StatusCodes } = require('http-status-codes');
const { SERVICE_ERROR_MESSAGES } = require('../../constants/messages');

class ServiceError extends Error {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }

  // Todo
  static todoNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TODO.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  // User
  static userNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.USER.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  static usernameAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.USER.USERNAME_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  static invalidUsernameOrPassword() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.USER.INVALID_USERNAME_OR_PASSWORD, StatusCodes.UNAUTHORIZED);
  }

  static todoNotBelongToUser() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TODO.NOT_BELONG_TO_USER, StatusCodes.FORBIDDEN);
  }

  // Team
  static teamNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  static teamNameAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.NAME_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  static teamMemberNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  static teamLimitExceeded() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.LIMIT_EXCEEDED, StatusCodes.CONFLICT);
  }

  static cannotInviteSelf() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.CANNOT_INVITE_SELF, StatusCodes.BAD_REQUEST);
  }

  static restrictInviteToMembers() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.RESTRICT_INVITE_TO_MEMBERS, StatusCodes.BAD_REQUEST);
  }

  static invitationAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVITATION_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  static teamInvitationNotFound() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVITATION_NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  static teamMemberAlreadyExists() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  static invalidTeamMemberAction() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVALID_TEAM_MEMBER_ACTION, StatusCodes.BAD_REQUEST);
  }

  static teamMemberLimitExceeded() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.MEMBER_LIMIT_EXCEEDED, StatusCodes.CONFLICT);
  }

  static invalidTeamRole() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.INVALID_TEAM_ROLE, StatusCodes.BAD_REQUEST);
  }

  static teamHasMembers() {
    return new ServiceError(SERVICE_ERROR_MESSAGES.TEAM.HAS_MEMBERS, StatusCodes.CONFLICT);
  }
}

module.exports = ServiceError;