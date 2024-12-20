import { useState } from "react";
import { authAPI } from "../service/authAPI";

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

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
      window.location.href = "/login";
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
