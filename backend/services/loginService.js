const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const loginRepository = require("../repositories/loginRepository");

dotenv.config();

const login = async (id, password) => {
  const key = process.env.SECRET_KEY;

  if (!key) {
    throw {
      status: 500,
      message: "SECRET_KEY가 누락되었습니다.",
    };
  }

  const user = await loginRepository.findUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "존재하지 않는 사용자입니다.",
    });
  }

  if (user.password !== password) {
    throw {
      status: 401,
      message: "비밀번호가 일치하지 않습니다.",
    };
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

  return token;
};

module.exports = {
  login,
};
