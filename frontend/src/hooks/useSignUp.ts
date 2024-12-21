import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../service/authAPI";

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const navigate = useNavigate();

  const validateUsername = () => {
    if (!username.trim()) {
      setErrors((prev) => ({ ...prev, username: "아이디를 입력해주세요." }));
    } else if (username.length < 3) {
      setErrors((prev) => ({ ...prev, username: "아이디는 3자 이상이어야 합니다." }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const validatePassword = () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "비밀번호를 입력해주세요." }));
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "비밀번호는 6자 이상이어야 합니다." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSignUp = async () => {
    validateUsername();
    validatePassword();
    if (errors.username || errors.password) return;

    try {
      await authAPI.signup(username, password);
      alert("회원가입이 성공적으로 완료되었습니다.");
      navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, username: error.response?.data?.error || "회원가입 실패" }));
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    validateUsername,
    validatePassword,
    handleSignUp,
  };
};

export default useSignUp;
