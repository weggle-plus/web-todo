const { StatusCodes } = require("http-status-codes");
const TeamService = require("../services/TeamService");
const {
  TeamRepositoryFactory,
  UserRepositoryFactory,
} = require("../models/RepositoryFactory");

class TeamController {
  static teamService = new TeamService(
    TeamRepositoryFactory.createRepository(),
    UserRepositoryFactory.createRepository()
  );

  static createTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.createTeam(
        req.user.id,
        req.body
      );
      res.status(StatusCodes.CREATED).json(team);
    } catch (error) {
      next(error);
    }
  };

  static getTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.getTeam(req.params.teamId);
      res.json(team);
    } catch (error) {
      next(error);
    }
  };

  static getUserTeams = async (req, res, next) => {
    try {
      const teams = await TeamController.teamService.getUserTeams(req.user.id);
      res.json(teams);
    } catch (error) {
      next(error);
    }
  };

  static updateTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.updateTeam(
        req.user.id,
        req.params.teamId,
        req.body
      );
      res.json(team);
    } catch (error) {
      next(error);
    }
  };

  static deleteTeam = async (req, res, next) => {
    try {
      await TeamController.teamService.deleteTeam(
        req.user.username,
        req.params.teamId
      );
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };

  static inviteMember = async (req, res, next) => {
    try {
      await TeamController.teamService.inviteMember(
        req.params.teamId,
        req.params.inviteeId,
        req.user.id,
        req.body.message
      );
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };

  static handleTeamMemberAction = async (req, res, next) => {
    try {
      await TeamController.teamService.handleTeamMemberAction(
        req.params.teamId,
        req.user.id,
        req.body.action
      );
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TeamController;
