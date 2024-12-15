const conn = require("../mariadb");

const getTodo = (req, res) => {
  res.json("todo 조회");
};

const createTodo = (req, res) => {
  res.json("todo 생성");
};

const updateTodo = (req, res) => {
  res.json("todo 수정");
};

const deleteTodo = (req, res) => {
  res.json("todo 삭제");
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
