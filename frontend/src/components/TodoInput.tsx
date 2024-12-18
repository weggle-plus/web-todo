import React from "react";
import styles from "./TodoInput.module.css";
import { TodoInputProps } from "../types";

const TodoInput: React.FC<TodoInputProps> = ({ inputValue, setInputValue, handleAddTodo }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={styles.inputField}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button className={styles.addButton} onClick={handleAddTodo}>
        등록하기
      </button>
    </div>
  );
};

export default TodoInput;
