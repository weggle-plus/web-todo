import Input from "./component/Input";
import TodoList from "./component/TodoList";
import apiModules from "./api";
import { useEffect, useState } from "react";
import DoneList from "./component/DoneList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    getTodoItems();
  }, []);

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

  return (
    <div className="container">
      <nav>
        <div className="nav_todo">할 일 목록</div>
      </nav>
      <section>
        <Input addTodoItem={apiModules.addTodoItem} />
        <TodoList todoList={todoList} toggleCheckbox={toggleCheckbox} />
        <DoneList doneList={doneList} toggleCheckbox={toggleCheckbox} />
      </section>
    </div>
  );
}

export default App;
