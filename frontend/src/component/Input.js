import { useState } from "react";
import apiModules from "../api";

function Input({ getTodoItems }) {
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = async () => {
    const inputTrimmed = inputValue.trim();
    if (inputTrimmed) {
      await apiModules.addTodoItem(inputTrimmed);
      getTodoItems();
    } else {
      alert("입력 값은 공백이 아니어야 합니다.");
    }
    setInputValue("");
  };

  return (
    <div className="input_wrap">
      <input
        type="text"
        id="input_todo"
        placeholder="할 일을 입력해주세요."
        value={inputValue}
        onChange={inputHandler}
      />
      <button className="btn_default" id="add_todo_btn" onClick={submitHandler}>
        등록하기
      </button>
    </div>
  );
}

export default Input;
