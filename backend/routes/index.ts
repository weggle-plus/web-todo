import express from "express";
export const router = express.Router();
export default router;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ welcome: "Hello express" }).end();
});
