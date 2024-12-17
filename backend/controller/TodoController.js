const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const SQL = {
  select: "SELECT * FROM todos",
  insert: "INSERT INTO todos (content) VALUES(?)",
  updateContent: "UPDATE todos SET content =? WHERE id = ?",
  updateStatus: "UPDATE todos SET is_done = ? WHERE id = ?",
  delete: "DELETE FROM todos WHERE id = ?",
};

const errHandler = (err) => {
  console.error("에러발생", err);
  res.status(StatusCodes.BAD_REQUEST).json(err);
};

const noAffectHandler = (res) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    message: "fail: bad request",
  });
};

const getTodo = (req, res) => {
  conn.query(SQL.select, (err, results) => {
    if (err) return errHandler(err);

    res.status(StatusCodes.OK).json(results);
  });
};

const createTodo = (req, res) => {
  const { content } = req.body;

  conn.query(SQL.insert, content, (err, results) => {
    if (err) return errHandler(err);

    res.status(StatusCodes.CREATED).json({
      message: "success: create todo",
    });
  });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { content, isDone } = req.body;

  if (id && content) {
    conn.query(SQL.updateContent, [content, id], (err, results) => {
      if (err) return errHandler(err);
      if (results.affectedRows == 0) return noAffectHandler(res);

      res.status(StatusCodes.OK).json({
        message: "success: update todo content",
      });
    });
  } else if (id && isDone !== undefined) {
    conn.query(SQL.updateStatus, [isDone, id], (err, results) => {
      if (err) return errHandler(err);
      if (results.affectedRows == 0) return noAffectHandler(res);

      res.status(StatusCodes.OK).json({
        message: "success: update todo status",
      });
    });
  }
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  conn.query(SQL.delete, id, (err, results) => {
    if (err) return errHandler(err);
    if (results.affectedRows == 0) return noAffectHandler(res);

    res.status(StatusCodes.OK).json({
      message: "success: delete todo",
    });
  });
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
