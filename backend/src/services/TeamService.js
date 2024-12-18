const { TEAM_MEMBER_ROLES } = require('../models/interfaces/TeamSchema');
const ValidationError = require('../utils/errors/ValidationError');

class TeamService {
  constructor(teamRepository, userRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  async createTeam(teamData, userId, role = TEAM_MEMBER_ROLES.MEMBER) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw ValidationError.userNotFound();
    }
    const team = await this.teamRepository.create(teamData);
    await this.teamRepository.addMember(team.id, userId, role);
    return team;
  }
  
  async inviteMember(teamId, userId) {
    const user = await this.userRepository.findByUserId(userId);
    if (!user) {
      throw ValidationError.userNotFound();
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
      throw ValidationError.teamNotFound();
    }
    return team;
  }

  async getUserTeams(userId) {
    return await this.teamRepository.findByUser(userId);
  }

  async updateTeam(teamId, userId, updateData) {
    // const role = await this.teamRepository.getMemberRole(teamId, userId);
    // if (role !== TEAM_MEMBER_ROLES.MANAGER) {
    //   throw new ValidationError('팀 관리자만 팀 정보를 수정할 수 있습니다.');
    // }

    return await this.teamRepository.update(teamId, updateData);
  }

  async deleteTeam(teamId, userId) {
    // const role = await this.teamRepository.getMemberRole(teamId, userId);
    // if (role !== TEAM_MEMBER_ROLES.MANAGER) {
    //   throw new ValidationError('팀 관리자만 팀을 삭제할 수 있습니다.');
    // }

    await this.teamRepository.delete(teamId);
  }

  async addMember(teamId, newUserId, role = TEAM_MEMBER_ROLES.MEMBER) {
    // const managerRole = await this.teamRepository.getMemberRole(teamId, managerId);
    // if (managerRole !== TEAM_MEMBER_ROLES.MANAGER) {
    //   throw new ValidationError('팀 관리자만 멤버를 추가할 수 있습니다.');
    // }
    return await this.teamRepository.addMember(teamId, newUserId, role);
  }

  async updateMemberRole(teamId, userId, newRole) {
    // const managerRole = await this.teamRepository.getMemberRole(teamId, managerId);
    // if (managerRole !== TEAM_MEMBER_ROLES.MANAGER) {
    //   throw new ValidationError('팀 관리자만 역할을 변경할 수 있습니다.');
    // }
    return await this.teamRepository.updateMemberRole(teamId, userId, newRole);
  }

  async removeMember(teamId, userId) {
    // const managerRole = await this.teamRepository.getMemberRole(teamId, managerId);
    // if (managerRole !== TEAM_MEMBER_ROLES.MANAGER) {
    //   throw new ValidationError('팀 관리자만 멤버를 제거할 수 있습니다.');
    // }

    // if (managerId === userId) {
    //   throw new ValidationError('관리자는 자신을 제거할 수 없습니다.');
    // }
    return await this.teamRepository.removeMember(teamId, userId);
  }
}

module.exports = TeamService; 