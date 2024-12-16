class TeamRepository {
  async create(teamData) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async update(id, teamData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  // 팀 멤버 관련 메서드
  async addMember(teamId, userId, role) {
    throw new Error('Method not implemented');
  }

  async removeMember(teamId, userId) {
    throw new Error('Method not implemented');
  }

  async updateMemberRole(teamId, userId, newRole) {
    throw new Error('Method not implemented');
  }

  async findMembers(teamId) {
    throw new Error('Method not implemented');
  }
}

module.exports = TeamRepository; 