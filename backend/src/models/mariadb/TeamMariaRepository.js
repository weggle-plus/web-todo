const { Team, UserTeam } = require('./TeamMaria');
const User = require('./UserMaria');
const { TEAM_MEMBER_ROLES } = require('../interfaces/TeamSchema');
const TeamRepository = require('../interfaces/TeamRepository');

class TeamMariaRepository extends TeamRepository {
  constructor(UserModel = User, TeamModel = Team, UserTeamModel = UserTeam) {
    super();
    this.User = UserModel;
    this.Team = TeamModel;
    this.UserTeam = UserTeamModel;
  }

  async create(teamData, userId, options = {}) {
    const existingTeam = await this.Team.findOne({
      where: { name: teamData.name }
    });
    
    if (existingTeam) {
      throw new Error('이미 존재하는 팀 이름입니다.');
    }
    
    const team = await this.Team.create(teamData, options);
    await this.UserTeam.create({
      userId,
      teamId: team.id,
      role: TEAM_MEMBER_ROLES.MANAGER
    }, options);
    return this.findById(team.id);
  }

  async findById(id) {
    return await this.Team.findByPk(id, {
      include: [{
        model: this.User,
        as: 'members',
        attributes: ['id', 'email', 'username'],
        through: {
          attributes: ['role', 'joinedAt']
        }
      }]
    });
  }

  async findByUser(userId) {
    return await this.Team.findAll({
      include: [{
        model: this.User,
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
    await this.Team.update(updateData, { where: { id } });
    return this.findById(id);
  }

  async delete(id) {
    await this.UserTeam.destroy({ where: { teamId: id } });
    await this.Team.destroy({ where: { id } });
  }

  async addMember(teamId, userId, role = TEAM_MEMBER_ROLES.MEMBER) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw new Error('팀을 찾을 수 없습니다.');
    }

    const user = await this.User.findByPk(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (userTeam) {
      throw new Error('이미 존재하는 멤버입니다.');
    }

    if (!Object.values(TEAM_MEMBER_ROLES).includes(role)) {
      throw new Error('유효하지 않은 역할입니다.');
    }

    await this.UserTeam.create({
      teamId,
      userId,
      role
    });

    return this.findById(teamId);
  }

  async updateMemberRole(teamId, userId, role) {
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (!userTeam) {
      throw new Error('사용자가 팀에 속해 있지 않습니다.');
    }

    if (!Object.values(TEAM_MEMBER_ROLES).includes(role)) {
      throw new Error('유효하지 않은 역할입니다.');
    }

    return await userTeam.update(
      { role },
      { where: { teamId, userId } }
    );
  }

  async removeMember(teamId, userId) {
    await this.UserTeam.destroy({
      where: { teamId, userId }
    });
    return this.findById(teamId);
  }

  async getMemberRole(teamId, userId) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw new Error('팀을 찾을 수 없습니다.');
    }

    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (!userTeam) {
      throw new Error('사용자가 팀에 속해 있지 않습니다.');
    }

    return userTeam.role;
  }

  async findAll() {
    return await this.Team.findAll({
      include: [{
        model: this.User,
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