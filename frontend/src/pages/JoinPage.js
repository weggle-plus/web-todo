import { useState } from "react";
import "../login-join.css";
import { useNavigate } from "react-router-dom";
import apiModules from "../api";

function Join() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  const [isPasswordSame, setIsPasswordSame] = useState(true);

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

    if (validatePassword && checkPassword === inputPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  const handleInputIsSameBlur = (e) => {
    const inputPassword = e.target.value;
    setCheckPassword(inputPassword);
    const isSame = inputs.password === inputPassword;
    setIsPasswordSame(isSame);
  };

  const handleClickJoin = async () => {
    if (isValidated && isPasswordSame) {
      try {
        const response = await apiModules.join(inputs);
        if (response) {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const getPasswordErrorMessage = (isValidated, isPasswordSame) => {
    if (!isValidated) {
      return (
        <span className="input_warning">
          "비밀번호는 특수문자/숫자/영문자가 포함된 8자 이상이어야 합니다."
        </span>
      );
    }
    if (!isPasswordSame) {
      return (
        <span className="input_warning">"비밀번호가 일치하지 않습니다."</span>
      );
    }
  };

  return (
    <div className="login_join_wrap">
      <span className="login_join_title">회원가입</span>
      <div className="input_wrap">
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          onChange={handleIdChange}
        ></input>
        <input
          type="password"
          minLength="8"
          onBlur={handleInputBlur}
          className={isValidated && isPasswordSame ? "" : "input_error"}
          placeholder="비밀번호를 입력해주세요."
        ></input>
        <input
          type="password"
          onBlur={handleInputIsSameBlur}
          className={isValidated && isPasswordSame ? "" : "input_error"}
          placeholder="비밀번호를 다시 입력해주세요."
        ></input>
        {getPasswordErrorMessage(isValidated, isPasswordSame)}
        <button onClick={handleClickJoin}>회원가입</button>
      </div>
    </div>
  );
}

export default Join;
