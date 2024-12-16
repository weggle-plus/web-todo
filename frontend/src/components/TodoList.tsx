import React from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
import { TodoListProps } from "../types";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  done,
  handleToggle,
  handleDelete,
  editingTodoId,
  editingText,
  setEditingText,
  startEditing,
  saveEditing,
  cancelEditing,
}) => {
  const { modalState, openModal, closeModal } = useModal();

  const confirmDelete = () => {
    if (modalState.target) {
      handleDelete(modalState.target.id, modalState.target.isTodo);
      closeModal();
    }
  };

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.sectionTitle}>TO DO</h2>
      <ul>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              isTodo
              handleToggle={handleToggle}
              handleDelete={(id, isTodo) => openModal(id, isTodo)}
              startEditing={startEditing}
              saveEditing={saveEditing}
              cancelEditing={cancelEditing}
              editingTodoId={editingTodoId}
              editingText={editingText}
              setEditingText={setEditingText}
            />
          ))
        ) : (
          <li className={styles.emptyMessage}>할 일 항목이 없습니다.</li>
        )}
      </ul>
      <h2 className={styles.sectionTitle}>DONE</h2>
      <ul>
        {done.length > 0 ? (
          done.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              isTodo={false}
              handleToggle={handleToggle}
              handleDelete={(id, isTodo) => openModal(id, isTodo)}
            />
          ))
        ) : (
          <li className={styles.emptyMessage}>완료 항목이 없습니다.</li>
        )}
      </ul>

      <Modal
        isOpen={modalState.isOpen}
        text="정말 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
};

export default TodoList;