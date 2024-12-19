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

  formatTeamResponse(teamData) {
    const response = {
      name: teamData.name,
      description: teamData.description
    };
    if (teamData.members) {
      response.members = teamData.members.map(member => ({
        username: member.username,
        role: member.role,
        joinedAt: member.joinedAt
      }));
    }
    return response;
  }

  formatTeam(teamData) {
    const team = {
      id: teamData.id,
      name: teamData.name,
      description: teamData.description,
      createdBy: teamData.createdBy,
      createdAt: teamData.createdAt,
      updatedAt: teamData.updatedAt,
      updatedBy: teamData.updatedBy
    };
    if (teamData.members) {
      team.members = teamData.members.map(member => ({
        username: member.username,
        role: member.role,
        joinedAt: member.joinedAt
      }));
    }
    return team;
  }

  formatTeamInvitation(invitation) {
    return {
      id: invitation.id,
      teamId: invitation.teamId,
      inviterId: invitation.inviterId,
      inviteeId: invitation.inviteeId,
      invitationMessage: invitation.invitationMessage,
      invitationStatus: invitation.invitationStatus,
      respondedAt: invitation.respondedAt
    };
  }

  static async teamValidation(teamId) {
    if (!teamId) {
      throw ServiceError.teamNotFound();
    }
    const team = await this.Team.findByPk(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
  }

  async create(userId, teamData, options = {}) {
    const existingTeam = await this.Team.findOne({ where: { name: teamData.name } });
    if (existingTeam) {
      throw ServiceError.teamNameAlreadyExists();
    }
    teamData.createdBy = userId;
    const team = await this.Team.create(teamData, options);
    return this.formatTeam(team);
  }

  async findAll() {
    const teams = await this.Team.findAll(this.teamOptions);
    return teams.map(this.formatTeam);
  }

  async findById(teamId) {
    const team = await this.Team.findByPk(teamId, this.teamOptions);
    return team ? this.formatTeamResponse(team) : null;
  }

  async findByUserId(userId) {
    const teams = await this.Team.findAll({
      ...this.teamOptions,
      include: [{
        ...this.teamOptions.include[0],
        where: {
          id: userId
        }
      }]
    });
    return teams.map(this.formatTeam);
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