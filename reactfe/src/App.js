import Input from "./component/Input";
import TodoList from "./component/TodoList";
import apiModules from "./api";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    apiModules.getTodoItems().then(setTodoList);
  }, []);

  return (
    <div className="container">
      <nav>
        <div className="nav_todo">할 일 목록</div>
      </nav>
      <section>
        <Input addTodoItem={apiModules.addTodoItem} />
        <TodoList todoList={todoList} />
      </section>
    </div>
  );
}

export default App;
