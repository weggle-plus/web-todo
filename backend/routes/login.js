const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const db = require("../datebase/db");

dotenv.config();

router.post("/login", (req, res, next) => {
  const key = process.env.SECRET_KEY;
  if (!key) {
    return res.status(500).json({
      message: "서버 설정 오류: SECRET_KEY가 누락되었습니다.",
    });
  }

  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      message: "아이디와 비밀번호를 입력하세요",
    });
  }

  const query = "SELECT id, password FROM users WHERE id = ?";
  db.get(query, [id], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "서버 에러",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "존재하지 않는 사용자입니다.",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const token = jwt.sign(
      {
        type: "JWT",
        id: user.id,
      },
      key,
      {
        expiresIn: "15m",
        issuer: "토큰발급자",
      }
    );

    return res.status(200).json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token: token,
    });
  });
});

module.exports = router;
