import { useState } from "react";
import "./login-join.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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

  const HandleClickJoin = () => {
    navigate("/join");
  };

  return (
    <div className="login_join_wrap">
      <span className="login_join_title">로그인</span>
      <div className="input_wrap">
        <input type="text" className={isValidated ? "" : "input_error"}></input>
        <input
          type="password"
          minLength="8"
          onBlur={HandleInputBlur}
          className={isValidated ? "" : "input_error"}
        ></input>
        {!isValidated && (
          <span className="input_warning">
            아이디와 비밀번호를 확인해주세요.
          </span>
        )}
        <button>로그인</button>
        <button className="btn_modify" onClick={HandleClickJoin}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
