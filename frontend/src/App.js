import Input from "./component/Input";
import TodoList from "./component/TodoList";
import apiModules from "./api";
import { useEffect, useState } from "react";
import DoneList from "./component/DoneList";
import DeleteCheckModal from "./component/DeleteCheckModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getTodoItems();
    }
  }, [isLoggedIn]);

  const getTodoItems = () => {
    apiModules.getTodoItems().then((items) => {
      if (items !== undefined) {
        const todoItems = items.filter((item) => item.done !== 1);
        const doneItems = items.filter((item) => item.done === 1);

        setTodoList(todoItems);
        setDoneList(doneItems);
      }
    });
  };

  const toggleCheckbox = async (todoItem) => {
    try {
      await apiModules.checkDone(todoItem);

      getTodoItems();
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const deleteTodo = (todoItemId) => {
    setTodoToDelete(todoItemId);
    setDeleteModal(true);
  };

  const onConfirmDelete = async () => {
    try {
      await apiModules.deleteTodoItem(todoToDelete);
    } catch (error) {
      console.log("error : ", error);
    }
    getTodoItems();
    setDeleteModal(false);
    setTodoToDelete(null);
  };
  const onCancelDelete = () => {
    setDeleteModal(false);
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

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/todo"
            element={
              isLoggedIn ? (
                <>
                  <nav>
                    <div className="nav_todo">할 일 목록</div>
                  </nav>
                  <section>
                    <Input
                      addTodoItem={apiModules.addTodoItem}
                      getTodoItems={getTodoItems}
                    />
                    <TodoList
                      todoList={todoList}
                      toggleCheckbox={toggleCheckbox}
                      deleteTodo={deleteTodo}
                      startEditing={startEditing}
                      cancelEditing={cancelEditing}
                      editingTodoId={editingTodoId}
                      updateEditing={updateEditing}
                    />
                    <DoneList
                      doneList={doneList}
                      toggleCheckbox={toggleCheckbox}
                      deleteTodo={deleteTodo}
                    />
                    {deleteModal && (
                      <DeleteCheckModal
                        onConfirmDelete={onConfirmDelete}
                        onCancelDelete={onCancelDelete}
                      />
                    )}
                  </section>
                </>
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
