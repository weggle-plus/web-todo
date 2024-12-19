const { Team, UserTeam } = require('./TeamMaria');
const User = require('./UserMaria');
const { TEAM_MEMBER_ROLES } = require('../interfaces/TeamSchema');
const TeamRepository = require('../interfaces/TeamRepository');
const UserRepository = require('../interfaces/UserRepository');
const ServiceError = require('../../utils/errors/ServiceError');

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
        attributes: ['id', 'username'],
        through: {
          attributes: ['role', 'joinedAt']
        },
        order: [['members', 'joinedAt', 'ASC']]
      }]
    };
  }

  async create(teamData, userId, options = {}) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ServiceError.authRequired();
    }
    const existingTeam = await this.Team.findOne({ where: { name: teamData.name } });
    if (existingTeam) {
      throw ServiceError.teamNameAlreadyExists();
    }

    return await this.Team.create(teamData, options);
  }

  async findAll() {
    return await this.Team.findAll(this.teamOptions);
  }

  async findById(teamId) {
    const team = await this.Team.findByPk(teamId, this.teamOptions);
    return team ? team : null;
  }

  async findByUserId(userId) {
    return await this.Team.findAll({
      ...this.teamOptions,
      include: [{
        ...this.teamOptions.include[0],
        where: {
          id: userId
        }
      }]
    });
  }

  async update(teamId, updateData) {
    await this.Team.update(updateData, { where: { id: teamId } });
  }

  async delete(teamId) {
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
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

  async inviteMember(teamId, inviterId, inviteeId, invitationMessage = '') {
    const user = await UserRepository.findById(inviterId);
    if (!user) {
      throw ServiceError.authRequired();
    }
    const isMember = await this.isMember(teamId, inviteeId);
    if (isMember) {
      throw ServiceError.memberAlreadyExists();
    }
    await this.TeamInvitation.create({
      teamId,
      inviterId,
      inviteeId,
      invitationMessage,
      invitationStatus: 'pending'
    });
  } 

  async acceptInvitation(teamId, inviteeId) {
    await this.addMember(teamId, inviteeId);
    await this.TeamInvitation.update({
      invitationStatus: 'accepted',
      respondedAt: new Date()
    }, {
      where: { teamId, inviteeId }
    });
  }

  async rejectInvitation(teamId, inviteeId) {
    await this.TeamInvitation.update({
      invitationStatus: 'rejected',
      respondedAt: new Date()
    }, {
      where: { teamId, inviteeId }
    });
  }

  async addMember(teamId, userId, role = TEAM_MEMBER_ROLES.MEMBER) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    await this.UserTeam.create({
      teamId,
      userId,
      role
    });
  }

  async isMember(teamId, userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    const team = await this.findByTeamId(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    return userTeam ? true : false;
  }

  async getMembers(teamId) {
    const team = await this.findByTeamId(teamId);
    return team ? team.members : [];
  }

  async getMemberRole(teamId, userId) {
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId }
    });
    return userTeam ? userTeam.role : null;
  }

  async updateMemberRole(teamId, userId, role) {
    return await this.UserTeam.update(
      { role },
      { where: { teamId, userId } }
    );
  }

  async removeMember(teamId, userId) {
    return await this.UserTeam.destroy({
      where: { teamId, userId }
    });
  }
}

module.exports = TeamMariaRepository; 