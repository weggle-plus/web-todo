const express = require("express");
const { getTodo, createTodo, updateTodo, deleteTodo } = require("../controller/TodoController");

const router = express.Router();

router.use(express.json());

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
