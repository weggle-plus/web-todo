const ServiceError = require('../utils/errors/ServiceError');
const constants = require('../constants/constants');

class TeamService {
  constructor(teamRepository, userRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  async validateUserExists(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  async createTeam(userId, teamData) {
    const existingTeam = await this.teamRepository.findByName(teamData.name);
    if (existingTeam) {
      throw ServiceError.teamNameAlreadyExists();
    }
    if (await this.teamRepository.countMyTeams(userId) >= constants.TEAM_LIMIT) {
      throw ServiceError.teamLimitExceeded();
    }

    const team = await this.teamRepository.create(userId, teamData);

    const role = teamData.role || constants.TEAM_MEMBER_ROLES.MEMBER;
    await this.teamRepository.addMember(team.id, userId, role);

    return await this.teamRepository.findById(team.id);
  }
  
  async getTeam(teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    return team;
  }

  async getUserTeams(userId) {
    return await this.teamRepository.findByUserId(userId);
  }

  async updateTeam(userId, teamId, updateData) {
    return await this.teamRepository.update(userId, teamId, updateData);
  }

  // 팀 삭제는 본인만 남았을 경우 가능
  async deleteTeam(username, teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    if (team.members && team.members.length > 1) {
      throw ServiceError.teamHasMembers();
    }
    if (team.members && team.members[0].username !== username) {
      throw ServiceError.teamHasMembers();
    }
    await this.teamRepository.delete(teamId);
  }

  async inviteMember(teamId, inviteeId, inviterId, invitationMessage = '') {
    const countTeamMembers = await this.teamRepository.countTeamMembers(teamId);
    if (countTeamMembers >= constants.TEAM_MEMBER_LIMIT) {
      throw ServiceError.teamMemberLimitExceeded();
    }

    if (inviterId === inviteeId) {
      throw ServiceError.cannotInviteSelf();
    }

    const isMember = await this.teamRepository.isMember(teamId, inviterId);
    if (!isMember) {
      throw ServiceError.restrictInviteToMembers();
    }

    await this.validateUserExists(inviteeId);

    const invitationRecord = await this.teamRepository.findInvitationRecord(teamId, inviteeId);
    if (invitationRecord) {
      throw ServiceError.invitationAlreadyExists();
    }

    if (await this.teamRepository.countMyTeams(inviteeId) >= constants.TEAM_LIMIT) {
      throw ServiceError.teamLimitExceeded();
    }
    // TODO: 거절 후라도 조건 충족시 다시 초대 가능하도록 수정

    await this.teamRepository.inviteMember(teamId, inviteeId, inviterId, invitationMessage);
  }

  async handleTeamMemberAction(teamId, userId, action) {
    switch (action) {
      case constants.TEAM_MEMBER_ACTIONS.ACCEPT:
        await this.teamRepository.acceptInvitation(teamId, userId);
        break;
      case constants.TEAM_MEMBER_ACTIONS.REJECT:
        await this.teamRepository.rejectInvitation(teamId, userId);
        break;
      case constants.TEAM_MEMBER_ACTIONS.LEAVE:
        await this.teamRepository.leaveTeam(teamId, userId);
        break;
      default:
        throw ServiceError.invalidTeamMemberAction();
    }
  }
}



module.exports = TeamService; 