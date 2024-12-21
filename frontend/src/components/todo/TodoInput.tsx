import { TodoInputProps } from "../../types/todos";
import styles from "../../styles/TodoInput.module.css";
import Input from "../common/Input";
import Button from "../common/Button";

const TodoInput: React.FC<TodoInputProps> = ({ inputValue, setInputValue, handleAddTodo }) => {
  return (
    <div className={styles.inputContainer}>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <Button text="등록하기" onClick={handleAddTodo} variant="confirm" />
    </div>
  );
};

export default TodoInput;
