const loginService = require("../services/loginService");

const login = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({
      message: "아이디와 비밀번호를 입력하세요",
    });
  }

  try {
    const token = await loginService.login(id, password);
    return res.status(200).json({
      message: "토큰이 정상적으로 발급되었습니다.",
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: "서버 에러",
    });
  }
};

module.exports = { login };
