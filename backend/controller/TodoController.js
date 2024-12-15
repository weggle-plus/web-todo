const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getTodo = (req, res) => {
  conn.query("SELECT * FROM todos", (err, results) => {
    res.status(StatusCodes.OK).json(results);
  });
};

const createTodo = (req, res) => {
  const { content } = req.body;

  conn.query(`INSERT INTO todos (content) VALUES(?)`, content, (err, results) => {
    if (err) {
      console.error("에러발생", err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.CREATED).end();
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (id && content) {
    conn.query("UPDATE todos SET content =? WHERE id = ?", [content, id], (err, results) => {
      if (err) {
        console.error("에러발생", err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).end();
    });
  }
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (id) {
    conn.query("DELETE FROM todos WHERE id = ?", id, (err, results) => {
      if (err) {
        console.error("에러발생", err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).end();
    });
  }
  res.status(StatusCodes.BAD_REQUEST).send("id 파라미터 필요");
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
