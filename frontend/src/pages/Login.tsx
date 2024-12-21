import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    login(username, password);
  };
  
  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-title"]}>로그인</h1>
      <Input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!error}
        variant="login"
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="login"
      />
      {error && <p className={styles["error-message"]}>{error}</p>}
      <Button text="로그인" onClick={handleSubmit} variant="login" />
      <a href="/signup" className={styles["signup-link"]}>
        회원가입
      </a>
    </div>
  );
};

export default Login;
