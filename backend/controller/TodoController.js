const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getTodo = (req, res) => {
  conn.query("SELECT * FROM todos", (err, results) => {
    res.status(StatusCodes.OK).json(results);
  });
};

const createTodo = (req, res) => {
  const { content } = req.body;

  conn.query(`INSERT INTO todos (content) VALUES("${content}")`, (err, results) => {
    if (err) {
      console.error("에러발생", err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.CREATED).end();
  });
};

const updateTodo = (req, res) => {
  res.json("todo 수정");
};

const deleteTodo = (req, res) => {
  res.json("todo 삭제");
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
