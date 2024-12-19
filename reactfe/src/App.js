import Input from "./component/Input";
import TodoList from "./component/TodoList";
import apiModules from "./api";

function App() {
  return (
    <div className="container">
      <nav>
        <div className="nav_todo">할 일 목록</div>
      </nav>
      <section>
        <Input addTodoItem={apiModules.addTodoItem}/>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
