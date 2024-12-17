const { TEAM_MEMBER_ROLES } = require('../models/interfaces/TeamSchema');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class TeamService {
  constructor(teamRepository, userRepository) {
    this.teamRepository = teamRepository;
    this.userRepository = userRepository;
  }

  async createTeam(teamData, creatorId) {
    const creator = await this.userRepository.findById(creatorId);
    if (!creator) {
      throw new ValidationError('유효하지 않은 사용자입니다.');
    }

    return await this.teamRepository.create(teamData, creatorId);
  }

  async getTeam(teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new ValidationError('팀을 찾을 수 없습니다.');
    }
    return team;
  }

  async getUserTeams(userId) {
    return await this.teamRepository.findByUser(userId);
  }

  async updateTeam(teamId, userId, updateData) {
    const role = await this.teamRepository.getMemberRole(teamId, userId);
    if (role !== TEAM_MEMBER_ROLES.MANAGER) {
      throw new ValidationError('팀 관리자만 팀 정보를 수정할 수 있습니다.');
    }

    return await this.teamRepository.update(teamId, updateData);
  }

  async deleteTeam(teamId, userId) {
    const role = await this.teamRepository.getMemberRole(teamId, userId);
    if (role !== TEAM_MEMBER_ROLES.MANAGER) {
      throw new ValidationError('팀 관리자만 팀을 삭제할 수 있습니다.');
    }

    await this.teamRepository.delete(teamId);
  }

  async addMember(teamId, newUserId, role = TEAM_MEMBER_ROLES.MEMBER) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new ValidationError('팀을 찾을 수 없습니다.');
    }

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