const { Team, UserTeam } = require('./TeamMaria');
const User = require('./UserMaria');
const { TEAM_MEMBER_ROLES } = require('../interfaces/TeamSchema');
const TeamRepository = require('../interfaces/TeamRepository');

class TeamMariaRepository extends TeamRepository {
  async create(teamData, creatorId) {
    const team = await Team.create(teamData);
    
    // 팀 생성자를 매니저로 추가
    await UserTeam.create({
      userId: creatorId,
      teamId: team.id,
      role: TEAM_MEMBER_ROLES.MANAGER
    });

    return this.findById(team.id);
  }

  async findById(id) {
    return await Team.findByPk(id, {
      include: [{
        model: User,
        as: 'members',
        attributes: ['id', 'email', 'username'],
        through: {
          attributes: ['role', 'joinedAt']
        }
      }]
    });
  }

  async findByUser(userId) {
    return await Team.findAll({
      include: [{
        model: User,
        as: 'members',
        attributes: ['id', 'email', 'username'],
        through: {
          attributes: ['role', 'joinedAt'],
          where: { userId }
        }
      }]
    });
  }

  async update(id, updateData) {
    await Team.update(updateData, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    await UserTeam.destroy({ where: { teamId: id } });
    await Team.destroy({ where: { id } });
  }

  async addMember(teamId, userId, role = TEAM_MEMBER_ROLES.MEMBER) {
    await UserTeam.create({
      teamId,
      userId,
      role
    });
    return this.findById(teamId);
  }

  async updateMemberRole(teamId, userId, role) {
    await UserTeam.update(
      { role },
      { where: { teamId, userId } }
    );
    return this.findById(teamId);
  }

  async removeMember(teamId, userId) {
    await UserTeam.destroy({
      where: { teamId, userId }
    });
    return this.findById(teamId);
  }

  async getMemberRole(teamId, userId) {
    const userTeam = await UserTeam.findOne({
      where: { teamId, userId }
    });
    return userTeam?.role;
  }

  async findAll() {
    return await Team.findAll({
      include: [{
        model: User,
        as: 'members',
        attributes: ['id', 'email', 'username'],
        through: {
          attributes: ['role', 'joinedAt']
        }
      }]
    });
  }

  async findMembers(teamId) {
    const team = await this.findById(teamId);
    return team ? team.members : [];
  }
}

module.exports = TeamMariaRepository; 