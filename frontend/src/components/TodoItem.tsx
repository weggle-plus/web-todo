import React from "react";
import styles from "./TodoItem.module.css";
import { TodoItemProps } from "../types";

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  isTodo,
  handleToggle,
  handleDelete,
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
              checked={item.completed}
              onChange={() => handleToggle(item.id, isTodo)}
            />
            <span
              className={isTodo ? styles.todoText : styles.doneText}
            >
              {item.text}
            </span>
            {isTodo && (
              <button
                className={styles.editButton}
                onClick={() => startEditing && startEditing(item.id)}
              >
                수정
              </button>
            )}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(item.id, isTodo)}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText && setEditingText(e.target.value)}
              className={styles.editInput}
            />
            <button
              className={styles.saveButton}
              onClick={() => saveEditing && saveEditing()}
            >
              완료
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => cancelEditing && cancelEditing()}
            >
              취소
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
