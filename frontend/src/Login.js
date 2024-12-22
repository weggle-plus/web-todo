import { useState } from "react";
import "./login-join.css";
import { useNavigate } from "react-router-dom";
import apiModules from "./api";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [isValidated, setIsValidated] = useState(true);

  const { id, password } = inputs;

  const handleIdChange = (e) => {
    const inputId = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      id: inputId,
    }));
  };

  const handleInputBlur = (e) => {
    const inputPassword = e.target.value;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const validatePassword =
      inputPassword.length > 8 && passwordRegex.test(inputPassword);
    setInputs((prevInputs) => ({
      ...prevInputs,
      password: inputPassword,
    }));
    setIsValidated(validatePassword);
  };

  const handleClickLogin = async () => {
    if (isValidated) {
      try {
        const response = await apiModules.login(inputs);
        if (response) {
          setIsLoggedIn(true);
          localStorage.setItem("token", response.token);
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handleClickJoin = () => {
    navigate("/join");
  };

  return (
    <div className="login_join_wrap">
      <span className="login_join_title">로그인</span>
      <div className="input_wrap">
        <input
          type="text"
          onChange={handleIdChange}
          className={isValidated ? "" : "input_error"}
          placeholder="아이디를 입력해주세요."
        ></input>
        <input
          type="password"
          minLength="8"
          onBlur={handleInputBlur}
          className={isValidated ? "" : "input_error"}
          placeholder="비밀번호를 입력해주세요."
        ></input>
        {!isValidated && (
          <span className="input_warning">
            아이디와 비밀번호를 확인해주세요.
          </span>
        )}
        <button onClick={handleClickLogin}>로그인</button>
        <button className="btn_modify" onClick={handleClickJoin}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
