import Input from "../components/common/Input";
import Button from "../components/common/Button";
import useSignUp from "../hooks/useSignUp";
import styles from "../styles/SignUp.module.css";

const SignUp: React.FC = () => {
  const {
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
  } = useSignUp();

  return (
    <div className={styles["signup-container"]}>
      <h1 className={styles["signup-title"]}>회원가입</h1>

      {/* 아이디 입력 필드 */}
      <Input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={validateUsername}
        error={!!errors.username}
        variant="login"
      />
      {errors.username && <p className={styles["error-message"]}>{errors.username}</p>}

      {/* 비밀번호 입력 필드 */}
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={validatePassword}
        error={!!errors.password}
        variant="login"
      />
      {errors.password && <p className={styles["error-message"]}>{errors.password}</p>}

      {/* 비밀번호 확인 필드 */}
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={validateConfirmPassword}
        error={!!errors.confirmPassword}
        variant="login"
      />
      {errors.confirmPassword && <p className={styles["error-message"]}>{errors.confirmPassword}</p>}

      {/* 회원가입 버튼 */}
      <Button text="회원가입" onClick={handleSignUp} variant="login" />
    </div>
  );
};

export default SignUp;
