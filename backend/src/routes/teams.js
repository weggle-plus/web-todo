const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', async (req, res, next) => {
  await TeamController.createTeam(req, res, next);
});

router.get('/:teamId', async (req, res, next) => {
  await TeamController.getTeam(req, res, next);
});

router.get('/user/teams', async (req, res, next) => {
  await TeamController.getUserTeams(req, res, next);
});

router.put('/:teamId', async (req, res, next) => {
  await TeamController.updateTeam(req, res, next);
});

router.delete('/:teamId', async (req, res, next) => {
  await TeamController.deleteTeam(req, res, next);
});

router.post('/:teamId', async (req, res, next) => {
  await TeamController.addMember(req, res, next);
});

router.put('/:teamId/:userId', async (req, res, next) => {
  await TeamController.updateMemberRole(req, res, next);
});

router.delete('/:teamId/:userId', async (req, res, next) => {
  await TeamController.removeMember(req, res, next);
});

module.exports = router; 