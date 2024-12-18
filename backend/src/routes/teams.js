const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, async (req, res, next) => {
  await TeamController.createTeam(req, res, next);
});

router.get('/:teamId', authenticate, async (req, res, next) => {
  await TeamController.getTeam(req, res, next);
});

router.get('/user/teams', authenticate, async (req, res, next) => {
  await TeamController.getUserTeams(req, res, next);
});

router.put('/:teamId', authenticate, async (req, res, next) => {
  await TeamController.updateTeam(req, res, next);
});

router.delete('/:teamId', authenticate, async (req, res, next) => {
  await TeamController.deleteTeam(req, res, next);
});

router.post('/:teamId', authenticate, async (req, res, next) => {
  await TeamController.addMember(req, res, next);
});

router.put('/:teamId/:userId', authenticate, async (req, res, next) => {
  await TeamController.updateMemberRole(req, res, next);
});

router.delete('/:teamId/:userId', authenticate, async (req, res, next) => {
  await TeamController.removeMember(req, res, next);
});

module.exports = router; 