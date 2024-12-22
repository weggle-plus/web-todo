import { useEffect, useState } from "react";
import DeleteCheckModal from "../component/DeleteCheckModal";
import DoneList from "../component/DoneList";
import Input from "../component/Input";
import TodoList from "../component/TodoList";
import { useNavigate } from "react-router-dom";
import apiModules from "../api";
import localStorageModule from "../util/localStorage";

function TodoPage({ setIsLoggedIn }) {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTodoItems();
  }, []);

  const getTodoItems = async () => {
    try {
      apiModules.getTodoItems().then((items) => {
        if (items !== undefined) {
          const todoItems = items.filter((item) => item.done !== 1);
          const doneItems = items.filter((item) => item.done === 1);

          setTodoList(todoItems);
          setDoneList(doneItems);
        }
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const toggleCheckbox = async (todoItem) => {
    try {
      await apiModules.checkDone(todoItem);
      getTodoItems();
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const onDeleteTodo = (todoItemId) => {
    setTodoToDelete(todoItemId);
    setIsDeleteModalOpened(true);
  };

  const onConfirmDelete = async () => {
    try {
      await apiModules.deleteTodoItem(todoToDelete);
    } catch (error) {
      console.log("error : ", error);
    }
    getTodoItems();
    setIsDeleteModalOpened(false);
    setTodoToDelete(null);
  };

  const onCancelDelete = () => {
    setIsDeleteModalOpened(false);
    setTodoToDelete(null);
  };

  const startEditing = (todoItemId) => {
    setEditingTodoId(todoItemId);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
  };

  const updateEditing = async (todoItem) => {
    try {
      await apiModules.updateEditing(todoItem);
      getTodoItems();
      setEditingTodoId(null);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  
  const handleClickLogout = () => {
    localStorageModule.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="nav_todo">할 일 목록</div>
        <button className="btn_modify" onClick={handleClickLogout}>
          로그아웃
        </button>
      </nav>
      <section>
        <Input getTodoItems={getTodoItems} />
        <TodoList
          todoList={todoList}
          toggleCheckbox={toggleCheckbox}
          onDeleteTodo={onDeleteTodo}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          editingTodoId={editingTodoId}
          updateEditing={updateEditing}
        />
        <DoneList
          doneList={doneList}
          toggleCheckbox={toggleCheckbox}
          onDeleteTodo={onDeleteTodo}
        />
        {isDeleteModalOpened && (
          <DeleteCheckModal
            onConfirmDelete={onConfirmDelete}
            onCancelDelete={onCancelDelete}
          />
        )}
      </section>
    </>
  );
}

export default TodoPage;
