import Button from "../common/Button";
import Input from "../common/Input";
import styles from "../../styles/TodoItem.module.css";
import { TodoItemProps } from "../../types/todos";

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  isTodo,
  handleToggleTodo,
  handleDeleteTodo,
  startEditing,
  saveEditing,
  cancelEditing,
  editingTodoId,
  editingText,
  setEditingText,
}) => {
  const isEditing = editingTodoId === item.id;

  return (
    <li>
      <div className={isTodo ? styles.todoItem : styles.doneItem}>
        {!isEditing ? (
          <>
            <input
              type="checkbox"
              checked={!isTodo || item.completed} // DONE 항목일 경우 체크, TODO 항목은 item.completed 따라감
              onChange={() => handleToggleTodo(item.id, isTodo)}
            />
            <span className={isTodo ? styles.todoText : styles.doneText}>
              {item.title}
            </span>
            {isTodo && (
              <Button
                text="수정"
                onClick={() => startEditing && startEditing(item.id, item.title)}
                variant="edit"
              />
            )}
            <Button
              text="삭제"
              onClick={() => handleDeleteTodo(item.id, isTodo)}
              variant="delete"
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              value={editingText || ""}
              onChange={(e) => setEditingText && setEditingText(e.target.value)}
              placeholder="수정할 내용을 입력하세요"
            />
            <Button
              text="완료"
              onClick={() => saveEditing && saveEditing()}
              variant="save"
            />
            <Button
              text="취소"
              onClick={() => cancelEditing && cancelEditing()}
              variant="cancel"
            />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
