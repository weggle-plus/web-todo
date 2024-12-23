const { Team, UserTeam } = require("./TeamMaria");
const User = require("./UserMaria");
const { TEAM_MEMBER_ROLES } = require("../interfaces/TeamSchema");
const TeamRepository = require("../interfaces/TeamRepository");

class TeamMariaRepository extends TeamRepository {
  constructor(UserModel = User, TeamModel = Team, UserTeamModel = UserTeam) {
    super();
    this.User = UserModel;
    this.Team = TeamModel;
    this.UserTeam = UserTeamModel;
    this.teamOptions = {
      include: [
        {
          model: this.User,
          as: "members",
          attributes: ["id", "username", "createdAt", "updatedAt"],
          through: {
            attributes: ["role", "joinedAt"],
          },
          order: [["members", "joinedAt", "ASC"]],
        },
      ],
    };
  }

  formatTeamResponse(teamData) {
    const response = {
      name: teamData.name,
      description: teamData.description,
    };
    if (teamData.members) {
      response.members = teamData.members.map((member) => ({
        username: member.username,
        role: member.role,
        joinedAt: member.joinedAt,
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
      updatedBy: teamData.updatedBy,
    };
    if (teamData.members) {
      team.members = teamData.members.map((member) => ({
        username: member.username,
        role: member.role,
        joinedAt: member.joinedAt,
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
      respondedAt: invitation.respondedAt,
    };
  }

  async create(userId, teamData, options = {}) {
    teamData.createdBy = userId;
    const team = await this.Team.create(teamData, options);
    return this.formatTeam(team);
  }

  async findAll() {
    const teams = await this.Team.findAll(this.teamOptions);
    return teams.map(this.formatTeam);
  }

  async countMyTeams(userId) {
    return await this.UserTeam.count({ where: { userId } });
  }

  async countTeamMembers(teamId) {
    return await this.UserTeam.count({ where: { teamId } });
  }

  async findById(teamId) {
    const team = await this.Team.findByPk(teamId, this.teamOptions);
    return team ? this.formatTeamResponse(team) : null;
  }

  async findByName(name) {
    const team = await this.Team.findOne({ where: { name } });
    return team ? this.formatTeamResponse(team) : null;
  }

  async findByUserId(userId) {
    const teams = await this.Team.findAll({
      include: [
        {
          model: this.UserTeam,
          where: { userId },
          required: true,
        },
        {
          model: this.User,
          as: "members",
          attributes: ["id", "username"],
          through: {
            attributes: ["role", "joinedAt"],
          },
        },
      ],
    });

    return teams.map((team) => this.formatTeamResponse(team));
  }

  async update(userId, teamId, updateData) {
    updateData.updatedBy = userId;
    await this.Team.update(updateData, { where: { id: teamId } });
  }

  async delete(teamId) {
    await this.Team.sequelize.transaction(async (t) => {
      await this.UserTeam.destroy({
        where: { teamId },
        transaction: t,
      });
      await this.Team.destroy({
        where: { id: teamId },
        transaction: t,
      });
    });
  }

  async inviteMember(teamId, inviterId, inviteeId, invitationMessage = "") {
    await this.TeamInvitation.create({
      teamId,
      inviterId,
      inviteeId,
      invitationMessage,
      invitationStatus: "pending",
    });
  }

  async findInvitationRecord(teamId, inviteeId) {
    return await this.TeamInvitation.findOne({
      where: {
        teamId,
        inviteeId,
      },
    });
  }

  async acceptInvitation(teamId, inviteeId, role = TEAM_MEMBER_ROLES.MEMBER) {
    await this.Team.sequelize.transaction(async (t) => {
      await this.addMember(teamId, inviteeId, role, { transaction: t });
      await this.TeamInvitation.update(
        {
          invitationStatus: "accepted",
          respondedAt: new Date(),
        },
        {
          where: { teamId, inviteeId },
          transaction: t,
        }
      );
    });
  }

  async rejectInvitation(teamId, inviteeId) {
    await this.TeamInvitation.update(
      {
        invitationStatus: "rejected",
        respondedAt: new Date(),
      },
      {
        where: { teamId, inviteeId },
      }
    );
  }

  async leaveTeam(teamId, userId) {
    await this.UserTeam.destroy({
      where: { teamId, userId },
    });
  }

  async addMember(
    teamId,
    userId,
    role = TEAM_MEMBER_ROLES.MEMBER,
    options = {}
  ) {
    await this.UserTeam.create(
      {
        teamId,
        userId,
        role,
      },
      options
    );
  }

  async isMember(teamId, userId) {
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId },
    });
    return userTeam ? true : false;
  }

  async getMembers(teamId) {
    const team = await this.findByTeamId(teamId);
    return team ? team.members : [];
  }

  async getMemberRole(teamId, userId) {
    const userTeam = await this.UserTeam.findOne({
      where: { teamId, userId },
    });
    return userTeam ? userTeam.role : null;
  }

  async updateMemberRole(teamId, userId, role) {
    return await this.UserTeam.update({ role }, { where: { teamId, userId } });
  }

  async removeMember(teamId, userId) {
    return await this.UserTeam.destroy({
      where: { teamId, userId },
    });
  }
}

module.exports = TeamMariaRepository;
