const { StatusCodes } = require('http-status-codes');
const TeamService = require('../services/TeamService');
const { TeamRepositoryFactory, UserRepositoryFactory } = require('../models/RepositoryFactory');

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
          message: '팀 생성 중 오류가 발생했습니다.',
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
          message: '팀 조회 중 오류가 발생했습니다.',
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
          message: '팀 업데이트 중 오류가 발생했습니다.',
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
          message: '팀 삭제 중 오류가 발생했습니다.',
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
        req.user.id,
        userId,
        role
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: '팀 멤버 추가 중 오류가 발생했습니다.',
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
        req.user.id,
        req.params.userId,
        role
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: '팀 멤버 역할 업데이트 중 오류가 발생했습니다.',
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
        req.user.id,
        req.params.userId
      );
      res.json(team);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: '팀 멤버 삭제 중 오류가 발생했습니다.',
          error: error.message
        });
      }
      next(error);
    }
  }
}

module.exports = new TeamController(); 