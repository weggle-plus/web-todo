const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController");
const authMiddleware = require("../middleware/auth.middleware");
const {
  validateTeam,
  validateTeamIdParam,
  validateInvitation,
} = require("../middleware/validateRequest");

router.use(authMiddleware.authenticate);

// 팀 생성
router.post("/", validateTeam, async (req, res, next) => {
  await TeamController.createTeam(req, res, next);
});

// 팀 현황 조회
router.get("/:teamId", validateTeamIdParam, async (req, res, next) => {
  await TeamController.getTeam(req, res, next);
});

// 유저가 속한 팀 조회
router.get("/", async (req, res, next) => {
  await TeamController.getUserTeams(req, res, next);
});

// 팀 업데이트
router.put(
  "/:teamId",
  validateTeamIdParam,
  validateTeam,
  async (req, res, next) => {
    await TeamController.updateTeam(req, res, next);
  }
);

// 팀 삭제
router.delete("/:teamId", validateTeamIdParam, async (req, res, next) => {
  await TeamController.deleteTeam(req, res, next);
});

// 팀 멤버 초대
router.post(
  "/:teamId/:inviteeId",
  validateTeamIdParam,
  validateInvitation,
  async (req, res, next) => {
    await TeamController.inviteMember(req, res, next);
  }
);

// 초대 수락 / 초대 거절 / 팀 탈퇴
router.post("/:teamId/action", validateTeamIdParam, async (req, res, next) => {
  await TeamController.handleTeamMemberAction(req, res, next);
});

module.exports = router;
