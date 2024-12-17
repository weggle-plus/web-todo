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
      return res.status(StatusCodes.BAD_REQUEST).json(err);
    }

    res.status(StatusCodes.CREATED).json({
      message: "success: create todo",
    });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { content, isDone } = req.body;

  if (id && content) {
    conn.query("UPDATE todos SET content =? WHERE id = ?", [content, id], (err, results) => {
      if (err) {
        console.error("에러발생", err);
        return res.status(StatusCodes.BAD_REQUEST).json(err);
      }

      if (results.affectedRows == 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "fail: bad request",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "success: update todo content",
      });
    });
  } else if (id && isDone !== undefined) {
    conn.query("UPDATE todos SET is_done = ? WHERE id = ?", [isDone, id], (err, results) => {
      if (err) {
        console.error("에러발생", err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.affectedRows == 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "fail: bad request",
        });
      }

      return res.status(StatusCodes.OK).json({
        message: "success: update todo status",
      });
    });
  }
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  conn.query("DELETE FROM todos WHERE id = ?", id, (err, results) => {
    if (err) {
      console.error("에러발생", err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows == 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "fail: bad request",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "success: delete todo",
    });
  });
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
