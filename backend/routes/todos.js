const express = require("express");
const { getTodo, createTodo, updateTodo, deleteTodo } = require("../controller/TodoController");
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

const validator = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) return next();

  res.status(StatusCodes.BAD_REQUEST).json(err.array());
};

router.use(express.json());

router.get("/", getTodo);
router.post("/", [body("content").notEmpty().withMessage("todo 내용 필요"), validator], createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
