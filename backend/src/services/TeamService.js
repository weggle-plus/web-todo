const ServiceError = require('../utils/errors/ServiceError');
const AuthError = require('../utils/errors/AuthError');
const constants = require('../constants/constants');

class TeamService {
  constructor(teamRepository, userRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  /**
   * 유저 존재 여부 검증
   * @param {string} userId - 유저의 ID
   * @returns {Promise<Object>} 유저 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async validateUserExists(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  /**
   * 유저의 팀 멤버 제한 검증
   * @param {string} userId - 유저의 ID
   * @throws {ServiceError} (409 Conflict)
   */
  async validateUserTeamLimit(userId) {
    const countTeamMembers = await this.teamRepository.countTeamMembers(teamId);
    if (countTeamMembers >= constants.TEAM_MEMBER_LIMIT) {
      throw ServiceError.teamMemberLimitExceeded();
    }
  }

  /**
   * 팀 존재 여부 검증
   * @param {string} teamId - 팀의 ID
   * @returns {Promise<Object>} 팀 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async validateTeamExists(teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    return team;
  }

  /**
   * 팀 이름 존재 여부 검증
   * @param {string} teamName - 팀의 이름
   * @throws {ServiceError} (409 Conflict)
   */
  async validateTeamAlreadyExists(teamName) {
    const team = await this.teamRepository.findByName(teamName);
    if (team) {
      throw ServiceError.teamNameAlreadyExists();
    }
  }

  /**
   * 팀 멤버여부 검증
   * @param {string} teamId - 팀의 ID
   * @param {string} userId - 유저의 ID
   * @throws {AuthError} 팀 멤버가 아닌 경우 에러 (403 Forbidden)
   */
  async validateMember(teamId, userId) {
    const isMember = await this.teamRepository.isMember(teamId, userId);
    if (!isMember) {
      throw ServiceError.notTeamMember();
    }
  }

  /**
   * 초대 기록 검증
   * @param {string} teamId - 팀의 ID
   * @param {string} inviteeId - 초대받을 유저의 ID
   * @returns {Promise<Object>} 초대 기록 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async validateInvitationRecord(teamId, inviteeId) {
    const invitation = await this.teamRepository.findInvitationRecord(teamId, inviteeId);
    if (!invitation) {
      throw ServiceError.invitationNotFound();
    }
    return invitation;
  }

  /**
   * 초대 이미 존재 여부 검증
   * @param {string} teamId - 팀의 ID
   * @param {string} inviteeId - 초대받을 유저의 ID
   * @throws {ServiceError} (409 Conflict)
   */
  async validateInvitationAlreadyExists(teamId, inviteeId) {
    const invitation = await this.teamRepository.findInvitationRecord(teamId, inviteeId);
    if (invitation) {
      throw ServiceError.invitationAlreadyExists();
    }
  }

  /**
   * 초대자와 초대받을 유저가 같은 경우 검증
   * @param {string} inviterId - 초대하는 유저의 ID
   * @param {string} inviteeId - 초대받을 유저의 ID
   * @throws {ServiceError} (400 Bad Request)
   */
  async validateCannotInviteSelf(inviterId, inviteeId) {
    if (inviterId === inviteeId) {
      throw ServiceError.cannotInviteSelf();
    }
  }

  /**
   * 팀 생성
   * @param {string} userId - 유저의 ID
   * @param {Object} teamData - 팀 데이터
   * @returns {Promise<Object>} 생성된 팀 객체
   * @throws {ServiceError} (400 Bad Request, 409 Conflict)
   */
  async createTeam(userId, teamData) {
    await this.validateTeamAlreadyExists(teamData.name);
    await this.validateUserTeamLimit(userId);

    const team = await this.teamRepository.create(userId, teamData);

    const role = teamData.role || constants.TEAM_MEMBER_ROLES.MEMBER;
    await this.teamRepository.addMember(team.id, userId, role);

    return await this.teamRepository.findById(team.id);
  }
  
  /**
   * 팀 조회
   * @param {string} teamId - 팀의 ID
   * @returns {Promise<Object>} 팀 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async getTeam(teamId) {
    return await this.validateTeamExists(teamId);
  }

  /**
   * 유저가 속한 모든 팀 조회
   * @param {string} userId - 유저의 ID
   * @returns {Promise<Array>} 팀 객체 배열
   */
  async getUserTeams(userId) {
    await this.validateUserExists(userId);
    return await this.teamRepository.findByUserId(userId);
  }

  /**
   * 팀 업데이트
   * @param {string} userId - 유저의 ID
   * @param {string} teamId - 팀의 ID
   * @param {Object} updateData - 업데이트할 팀 데이터
   * @returns {Promise<Object>} 업데이트된 팀 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async updateTeam(userId, teamId, updateData) {
    await this.validateTeamExists(teamId);
    await this.validateMember(teamId, userId);
    return await this.teamRepository.update(userId, teamId, updateData);
  }

  /**
   * 팀 삭제
   * @param {string} username - 유저의 이름
   * @param {string} teamId - 팀의 ID
   * @throws {ServiceError} (404 Not Found, 403 Forbidden, 409 Conflict)
   */
  async deleteTeam(username, teamId) {
    const team = await this.validateTeamExists(teamId);
    if (team.members && team.members.length > 1) {
      throw ServiceError.teamHasMembers();
    }
    if (team.members && team.members[0].username !== username) {
      throw ServiceError.teamHasMembers();
    }
    await this.teamRepository.delete(teamId);
  }

  /**
   * 팀 초대
   * @param {string} teamId - 팀의 ID
   * @param {string} inviteeId - 초대할 유저의 ID
   * @param {string} inviterId - 초대하는 유저의 ID
   * @param {string} invitationMessage - 초대 메시지(선택)
   * @throws {ServiceError} (400 Bad Request, 409 Conflict)
   */
  async inviteMember(teamId, inviteeId, inviterId, invitationMessage = '') {
    await this.validateUserTeamLimit(inviterId);
    await this.validateCannotInviteSelf(inviterId, inviteeId);
    await this.validateMember(teamId, inviterId);
    await this.validateUserExists(inviteeId);
    await this.validateInvitationAlreadyExists(teamId, inviteeId);
    await this.validateUserTeamLimit(inviteeId);
    // TODO: 거절 후라도 조건 충족시 다시 초대 가능하도록 수정

    await this.teamRepository.inviteMember(teamId, inviteeId, inviterId, invitationMessage);
  }

  /**
   * 팀 멤버 액션 처리
   * @param {string} teamId - 팀의 ID
   * @param {string} userId - 유저의 ID
   * @param {string} action - 액션 (accept, reject, leave)
   * @throws {ServiceError} (400 Bad Request, 404 Not Found)
   */
  async handleTeamMemberAction(teamId, userId, action) {

    switch (action) {
      case constants.TEAM_MEMBER_ACTIONS.ACCEPT:
        const invitation = await this.validateInvitationRecord(teamId, userId);
        await this.teamRepository.acceptInvitation(teamId, userId, invitation.role);
        break;
      case constants.TEAM_MEMBER_ACTIONS.REJECT:
        await this.validateInvitationRecord(teamId, userId);
        await this.teamRepository.rejectInvitation(teamId, userId);
        break;
      case constants.TEAM_MEMBER_ACTIONS.LEAVE:
        await this.validateMember(teamId, userId);
        await this.teamRepository.leaveTeam(teamId, userId);
        break;
      default:
        throw ServiceError.invalidTeamMemberAction();
    }
  }
}



module.exports = TeamService; 