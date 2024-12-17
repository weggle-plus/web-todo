const { Team, UserTeam } = require('./TeamMaria');
const User = require('./UserMaria');
const { TEAM_MEMBER_ROLES } = require('../interfaces/TeamSchema');
const TeamRepository = require('../interfaces/TeamRepository');
const ValidationError = require('../../utils/errors/ValidationError');

class TeamMariaRepository extends TeamRepository {
  constructor(UserModel = User, TeamModel = Team, UserTeamModel = UserTeam) {
    super();
    this.User = UserModel;
    this.Team = TeamModel;
    this.UserTeam = UserTeamModel;
    this.teamOptions = {
      include: [{
        model: this.User,
        as: 'members',
        attributes: ['id', 'email', 'username'],
        through: {
          attributes: ['role', 'joinedAt']
        },
        order: [['members', 'joinedAt', 'ASC']]
      }]
    };
  }

  async create(teamData, options = {}) {
    const existingTeam = await this.Team.findOne({
      where: { name: teamData.name }
    });
    
    if (existingTeam) {
      throw ValidationError.teamNameAlreadyExists();
    }
    return await this.Team.create(teamData, options);
  }

  async findAll() {
    return await this.Team.findAll(this.teamOptions);
  }

  async findByTeamId(teamId) {
    const team = await this.Team.findByPk(teamId, this.teamOptions);
    return team ? team : null;
  }

  async findByUserId(userId) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      throw ValidationError.userNotFound();
    }
    return await this.Team.findAll(this.teamOptions);
  }

  async update(teamId, updateData) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ValidationError.teamNotFound();
    }
    await this.Team.update(updateData, { where: { id: teamId } });

    return await this.findByTeamId(teamId);
  }

  async delete(teamId) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ValidationError.teamNotFound();
    }
    await this.Team.sequelize.transaction(async (t) => {
      await this.UserTeam.destroy({ 
        where: { teamId }, 
        transaction: t 
      });
      await this.Team.destroy({ 
        where: { id: teamId }, 
        transaction: t 
      });
    });
  }

  async addMember(teamId, userId, role = TEAM_MEMBER_ROLES.MEMBER) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ValidationError.teamNotFound();
    }

    const user = await this.User.findByPk(userId);
    if (!user) {
      throw ValidationError.userNotFound();
    }

    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (userTeam) {
      throw ValidationError.teamMemberAlreadyExists();
    }

    if (!Object.values(TEAM_MEMBER_ROLES).includes(role)) {
      throw ValidationError.teamMemberRoleInvalid();
    }

    await this.UserTeam.create({
      teamId,
      userId,
      role
    });

    return this.findByTeamId(teamId);
  }

  async getMembers(teamId) {
    const team = await this.findByTeamId(teamId);
    if (!team) {  
      throw ValidationError.teamNotFound();
    }
    return team.members;
  }

  async getMemberRole(teamId, userId) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ValidationError.teamNotFound();
    }

    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (!userTeam) {
      throw ValidationError.teamMemberNotFound();
    }

    return userTeam.role;
  }

  async updateMemberRole(teamId, userId, role) {
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    if (!userTeam) {
      throw ValidationError.teamMemberNotFound();
    }

    if (!Object.values(TEAM_MEMBER_ROLES).includes(role)) {
      throw ValidationError.teamMemberRoleInvalid();
    }

    return await userTeam.update(
      { role },
      { where: { teamId, userId } }
    );
  }

  async removeMember(teamId, userId) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ValidationError.teamNotFound();
    }

    return await this.UserTeam.destroy({
      where: { teamId, userId }
    });
  }
}

module.exports = TeamMariaRepository; 