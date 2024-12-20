import { useState } from "react";
import "./login.css";

function Login() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [isValidated, setIsValidated] = useState(true);

  const { id, password } = inputs;

  const HandleInputBlur = (e) => {
    const inputPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const validatePassword =
      inputPassword.length > 8 && passwordRegex.test(inputPassword);
    setInputs({ id: "", password: inputPassword });
    setIsValidated(validatePassword);
  };

  return (
    <div className="login_wrap">
      <span className="login_title">로그인</span>
      <div className="login_input_wrap">
        <input type="text" className={isValidated ? "" : "input_error"}></input>
        <input
          type="password"
          minLength="8" 
          onBlur={HandleInputBlur}
          className={isValidated ? "" : "input_error"}
        ></input>
        {!isValidated && (
          <span className="login_warning">
            아이디와 비밀번호를 확인해주세요.
          </span>
        )}
        <button>로그인</button>
        <button className="btn_modify">회원가입</button>
      </div>
    </div>
  );
}

export default Login;
