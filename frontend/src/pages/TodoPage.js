import { useEffect, useState } from "react";
import DeleteCheckModal from "../components/DeleteCheckModal";
import DoneList from "../components/DoneList";
import Input from "../components/Input";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import apiModules from "../api";
import localStorageModule from "../utils/localStorage";
import { ROUTES, TOKEN } from "../utils/constants";

function TodoPage({ setIsLoggedIn }) {
  const [todoList, setTodoList] = useState({
    inProgress: [],
    done: [],
  });
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refetchTodoItems();
  }, []);

  const refetchTodoItems = async () => {
    try {
      apiModules.getTodoItems().then((items) => {
        if (items !== undefined) {
          const todoItems = items.filter((item) => item.done !== 1);
          const doneItems = items.filter((item) => item.done === 1);

          setTodoList({
            inProgress: todoItems,
            done: doneItems,
          });
        }
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const toggleCheckbox = async (todoItem) => {
    try {
      await apiModules.checkDone(todoItem);
      refetchTodoItems();
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
    refetchTodoItems();
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
      refetchTodoItems();
      setEditingTodoId(null);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleClickLogout = () => {
    localStorageModule.remove(TOKEN);
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);
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
        <Input getTodoItems={refetchTodoItems} />
        <TodoList
          todoList={todoList.inProgress}
          toggleCheckbox={toggleCheckbox}
          onDeleteTodo={onDeleteTodo}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          editingTodoId={editingTodoId}
          updateEditing={updateEditing}
        />
        <DoneList
          doneList={todoList.done}
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
