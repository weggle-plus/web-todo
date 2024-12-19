const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.authenticate);

router.post('/', 
  TeamController.validateTeam, 
  async (req, res, next) => {
    await TeamController.createTeam(req, res, next);
  }
);

router.get('/:teamId', 
  TeamController.validateTeamId, 
  async (req, res, next) => {
    await TeamController.getTeam(req, res, next);
  }
);

router.get('/user/teams', 
  async (req, res, next) => {
    await TeamController.getUserTeams(req, res, next);
  }
);

router.put('/:teamId', 
  TeamController.validateTeamId,
  TeamController.validateTeam,
  async (req, res, next) => {
    await TeamController.updateTeam(req, res, next);
  }
);

router.delete('/:teamId', 
  TeamController.validateTeamId,
  async (req, res, next) => {
    await TeamController.deleteTeam(req, res, next);
  }
);

router.post('/:teamId/members', 
  TeamController.validateTeamId,
  TeamController.validateMember,
  async (req, res, next) => {
    await TeamController.addMember(req, res, next);
  }
);

router.put('/:teamId/members/:userId', 
  TeamController.validateMemberRole,
  async (req, res, next) => {
    await TeamController.updateMemberRole(req, res, next);
  }
);

router.delete('/:teamId/members/:userId', 
  TeamController.validateMemberRole,
  async (req, res, next) => {
    await TeamController.removeMember(req, res, next);
  }
);

module.exports = router; 