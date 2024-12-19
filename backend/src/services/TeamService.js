const { TEAM_MEMBER_ROLES } = require('../models/interfaces/TeamSchema');
const ServiceError = require('../utils/errors/ServiceError');

class TeamService {
  constructor(teamRepository, userRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  async createTeam(userId, teamData) {
    if (teamData.role && !Object.values(TEAM_MEMBER_ROLES).includes(teamData.role)) {
      throw ServiceError.invalidTeamRole();
    }

    const team = await this.teamRepository.create(userId, teamData);

    const role = teamData.role || TEAM_MEMBER_ROLES.MEMBER;
    await this.teamRepository.addMember(team.id, userId, role);

    return await this.teamRepository.findById(team.id);
  }
  
  async inviteMember(teamId, userId) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    await this.teamRepository.inviteMember(teamId, userId);
  }

  async acceptInvitation(teamId, userId) {
    await this.teamRepository.acceptInvitation(teamId, userId);
  }

  async rejectInvitation(teamId, userId) {
    await this.teamRepository.rejectInvitation(teamId, userId);
  }

  async getTeam(teamId) {
    const team = await this.teamRepository.findByTeamId(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    return team;
  }

  async getUserTeams(userId) {
    return await this.teamRepository.findByUser(userId);
  }

  async updateTeam(teamId, updateData) {
    return await this.teamRepository.update(teamId, updateData);
  }

  // 팀 삭제는 팀원이 없을 때만 가능
  async deleteTeam(teamId) {
    await this.teamRepository.delete(teamId);
  }

  // 누구나 팀원 추가 가능
  async addMember(teamId, newUserId, role = TEAM_MEMBER_ROLES.MEMBER) {
    return await this.teamRepository.addMember(teamId, newUserId, role);
  }

  // 누구나 자신의 역할 변경 가능
  async updateMemberRole(teamId, userId, newRole) {
    return await this.teamRepository.updateMemberRole(teamId, userId, newRole);
  }

  // 팀 탈퇴는 스스로, 또는 매니저만 가능
  async removeMember(teamId, userId) {
    return await this.teamRepository.removeMember(teamId, userId);
  }
}

module.exports = TeamService; 