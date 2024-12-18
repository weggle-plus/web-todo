const { StatusCodes } = require('http-status-codes');
const { body, param } = require('express-validator');
const TeamService = require('../services/TeamService');
const { TeamRepositoryFactory, UserRepositoryFactory } = require('../models/RepositoryFactory');
const { VALIDATION_ERROR_MESSAGES } = require('../constants/messages');
const { TEAM_MEMBER_ROLES } = require('../models/interfaces/TeamSchema');
const validateRequest = require('../middleware/validateRequest');

class TeamController {
  static teamService = new TeamService(
    TeamRepositoryFactory.createRepository(),
    UserRepositoryFactory.createRepository()
  );

  static validateTeam = [
    body('name')
      .isString()
      .notEmpty()
      .trim()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.NAME_REQUIRED)
      .isLength({ min: 2, max: 50 })
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.NAME_LENGTH),
    body('description')
      .optional()
      .isString()
      .trim()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.DESCRIPTION_INVALID),
    validateRequest
  ];

  static validateTeamId = [
    param('teamId')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.ID_INVALID),
    validateRequest
  ];

  static validateMember = [
    body('userId')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ID_INVALID),
    body('role')
      .optional()
      .isIn(Object.values(TEAM_MEMBER_ROLES))
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID),
    validateRequest
  ];

  static validateMemberRole = [
    param('teamId')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.ID_INVALID),
    param('userId')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ID_INVALID),
    body('role')
      .isIn(Object.values(TEAM_MEMBER_ROLES))
      .withMessage(VALIDATION_ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID),
    validateRequest
  ];

  static createTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.createTeam(req.body, req.user.id);
      res.status(StatusCodes.CREATED).json(team);
    } catch (error) {
      next(error);
    }
  }

  static getTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.getTeam(req.params.teamId);
      res.json(team);
    } catch (error) {
      next(error);
    }
  }

  static getUserTeams = async (req, res, next) => {
    try {
      const teams = await TeamController.teamService.getUserTeams(req.user.id);
      res.json(teams);
    } catch (error) {
      next(error);
    }
  }

  static updateTeam = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.updateTeam(
        req.params.teamId,
        req.user.id,
        req.body
      );
      res.json(team);
    } catch (error) {
      next(error);
    }
  }

  static deleteTeam = async (req, res, next) => {
    try {
      await TeamController.teamService.deleteTeam(req.params.teamId, req.user.id);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }

  static addMember = async (req, res, next) => {
    try {
      const { userId, role } = req.body;
      const team = await TeamController.teamService.addMember(
        req.params.teamId,
        userId,
        role
      );
      res.json(team);
    } catch (error) {
      next(error);
    }
  }

  static updateMemberRole = async (req, res, next) => {
    try {
      const { role } = req.body;
      const team = await TeamController.teamService.updateMemberRole(
        req.params.teamId,
        req.params.userId,
        role
      );
      res.json(team);
    } catch (error) {
      next(error);
    }
  }

  static removeMember = async (req, res, next) => {
    try {
      const team = await TeamController.teamService.removeMember(
        req.params.teamId,
        req.params.userId
      );
      res.json(team);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController; 