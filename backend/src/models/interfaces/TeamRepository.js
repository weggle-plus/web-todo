class TeamRepository {
  async create(teamData) {
    throw new Error('Method not implemented');
  }

  async findAll() {  // 모든 팀 조회
    throw new Error('Method not implemented');
  }

  async findByTeamId(teamId) {  // 팀 아이디로 팀 조회
    throw new Error('Method not implemented');
  }

  async findByUserId(userId) {  // 사용자 아이디로 모든 팀 조회
    throw new Error('Method not implemented');
  }

  async update(teamId, teamData) {  // 팀 아이디로 팀 업데이트
    throw new Error('Method not implemented');
  }

  async delete(teamId) {  // 팀 아이디로 팀 삭제
    throw new Error('Method not implemented');
  }
  // 팀 초대 관련 메서드
  async inviteMember(teamId, inviterId, inviteeId) {
    throw new Error('Method not implemented');
  }

  async acceptInvitation(teamId, inviteeId) {
    throw new Error('Method not implemented');
  }

  async rejectInvitation(teamId, inviteeId) {
    throw new Error('Method not implemented');
  }

  // 팀 멤버 관련 메서드
  async addMember(teamId, userId, role) {
    throw new Error('Method not implemented');
  }

  async getMembers(teamId) {  // 팀 아이디로 팀 멤버 조회
    throw new Error('Method not implemented');
  }

  async getMemberRole(teamId, userId) {  // 팀 아이디와 사용자 아이디로 팀 멤버 역할 조회
    throw new Error('Method not implemented');
  }

  async updateMemberRole(teamId, userId, newRole) {
    throw new Error('Method not implemented');
  }

  async removeMember(teamId, userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = TeamRepository; 