const express = require("express");
const router = express.Router();
const db = require("../datebase/db");
const { StatusCodes } = require("http-status-codes");

router.post("/", (req, res) => {
    const {id, password} = req.body; // , passwordConfirmation 추가 가능
    const sql = `INSERT INTO users (id, password) VALUES (?, ?)`;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!-/:-@[-{-~])/;

    if (!id || !password) { // || !passwordConfirmation 조건 추가 가능
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "id or password is missing." });
    }

    if (password.length < 8 || !passwordRegex.test(password)) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "At least 8 chars, 1 letter, 1 number, 1 special char" });
    }

    // 입력한 두 비밀번호가 동일하지 않을 경우
    // 개발자 도구등을 통해서 FE 비밀번호 검사를 우회할 가능성이 있다.
    // FE와 BE 모두 검증하는 것이 보안과 데이터 무결성을 위해 권장된다.
    // if (password !== passwordConfirmation) {
    //   return res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ message: "Passwords do not match" });
    // }

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