const { StatusCodes } = require('http-status-codes');
const TeamService = require('../services/TeamService');
const { TeamRepositoryFactory, UserRepositoryFactory } = require('../models/RepositoryFactory');
const { ERROR_MESSAGES } = require('../constants/messages');

class TeamController {
  constructor() {
    this.teamService = new TeamService(
      TeamRepositoryFactory.createRepository(),
      UserRepositoryFactory.createRepository()
    );
  }

  async createTeam(req, res) {
    try {
      const team = await this.teamService.createTeam(req.body, req.user.id);
      res.status(StatusCodes.CREATED).json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ERROR_MESSAGES.TEAM.CREATE,
          error: error.message
        });
      }
    }
  }

  async getTeam(req, res) {
    try {
      const team = await this.teamService.getTeam(req.params.teamId);
      res.json(team);
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ERROR_MESSAGES.TEAM.READ,
          error: error.message
        });
      }
    }
  }

  async getUserTeams(req, res, next) {
    try {
      const teams = await this.teamService.getUserTeams(req.user.id);
      res.json(teams);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateTeam(req, res, next) {
    try {
      const team = await this.teamService.updateTeam(
        req.params.teamId,
        req.user.id,
        req.body
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ERROR_MESSAGES.TEAM.UPDATE,
          error: error.message
        });
      }
      next(error);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      await this.teamService.deleteTeam(req.params.teamId, req.user.id);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ERROR_MESSAGES.TEAM.DELETE,
          error: error.message
        });
      }
      next(error);
    }
  }

  async addMember(req, res, next) {
    try {
      const { userId, role } = req.body;
      const team = await this.teamService.addMember(
        req.params.teamId,
        userId,
        role
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ERROR_MESSAGES.TEAM.MEMBER.ADD,
          error: error.message
        });
      }
      next(error);
    }
  }

  async updateMemberRole(req, res, next) {
    try {
      const { role } = req.body;
      const team = await this.teamService.updateMemberRole(
        req.params.teamId,
        req.params.userId,
        role
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ERROR_MESSAGES.TEAM.MEMBER.UPDATE_ROLE,
          error: error.message
        });
      }
      next(error);
    }
  }

  async removeMember(req, res, next) {
    try {
      const team = await this.teamService.removeMember(
        req.params.teamId,
        req.params.userId
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: ERROR_MESSAGES.TEAM.MEMBER.REMOVE,
          error: error.message
        });
      }
      next(error);
    }
  }
}

module.exports = new TeamController(); 