import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../service/authAPI";

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 재입력
  const [errors, setErrors] = useState({
    username: null as string | null,
    password: null as string | null,
    confirmPassword: null as string | null, // 재입력 에러 상태 추가
  });

  const navigate = useNavigate();

  // 아이디 검증
  const validateUsername = () => {
    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "아이디를 입력해주세요." }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, username: null }));
    return true;
  };

  // 비밀번호 검증
  const validatePassword = () => {
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "비밀번호를 입력해주세요." }));
      return false;
    }
    if (password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "비밀번호는 6자 이상이어야 합니다." }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    return true;
  };

  // 비밀번호 확인 검증
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }));
    return true;
  };

  // 회원가입 처리
  const handleSignUp = async () => {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
      return; // 검증 실패 시 회원가입 요청 중단
    }

    try {
      await signUpAPI({ username, password });
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    validateUsername,
    validatePassword,
    validateConfirmPassword,
    handleSignUp,
  };
};

export default useSignUp;
