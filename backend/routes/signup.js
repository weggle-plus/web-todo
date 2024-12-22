const express = require("express");
const router = express.Router();
const db = require("../database/db");
const { StatusCodes } = require("http-status-codes");

router.post("/", (req, res) => {
    const {id, password} = req.body;
    const sql = `INSERT INTO users (id, password) VALUES (?, ?)`;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!-/:-@[-{-~])/;

    if (!id || !password) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "id or password is missing." });
    }

    if (password.length < 8 || !passwordRegex.test(password)) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "At least 8 chars, 1 letter, 1 number, 1 special char" });
    }

    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error finding id: ${err.message}` });
      }

      if (row) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ message: "id is already taken" });
      }

      db.run(sql, [id, password], function (err) {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: `Error creating user: ${err.message}` });
        }

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "User created successfully" });
      });
    });
});

module.exports = router;