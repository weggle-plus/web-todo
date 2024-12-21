const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { StatusCodes } = require("http-status-codes");
const { checkUserId } = require("../middleware/token");

router.get("/", checkUserId, (req, res) => {
  const sql = `SELECT * FROM todos WHERE user_id = ?`;

  db.all(sql, [req.userId], (err, rows) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${err.message}` });
    }
    return res.status(StatusCodes.OK).json(rows);
  });
});

router.post("/", checkUserId, (req, res) => {
  const { title } = req.body;
  const sql = `INSERT INTO todos (title, user_id) VALUES (?, ?)`;

  if (!title || !title.trim()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input format" });
  }

  db.run(sql, [title, req.userId], (err) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error adding TO DO: ${err.message}` });
    }
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "TO DO created successfully" });
  });
});

router.patch("/:id", checkUserId, (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const sql = `UPDATE todos SET done = ? WHERE id = ? AND user_id = ?`;

  db.get(`SELECT * FROM todos WHERE id = ? AND user_id = ?`, [id, req.userId], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }
    if (!row) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    db.run(sql, [done, id, req.userId], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error updating TO DO's done: ${err.message}` });
      }

      return res.status(StatusCodes.OK).json({ id, done });
    });
  });
});

router.put("/:id", checkUserId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const sql = `UPDATE todos SET title = ? WHERE id = ? AND user_id = ?`;

  if (!title || !title.trim()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input format" });
  }

  db.get(`SELECT * FROM todos WHERE id = ? AND user_id = ?`, [id, req.userId], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }

    if (!row) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    db.run(sql, [title, id, req.userId], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error updating TO DO's title: ${err.message}` });
      }

      return res.status(StatusCodes.OK).json({ id, title });
    });
  });
});

router.delete("/:id", checkUserId, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM todos WHERE id = ? AND user_id = ?`;

  db.get(`SELECT * FROM todos WHERE id = ? AND user_id = ?`, [id, req.userId], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }

    if (!row) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    db.run(sql, [id, req.userId], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error deleting TO DO: ${err.message}` });
      }

      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "TO DO deleted successfully", id });
    });
  });
});

module.exports = router;