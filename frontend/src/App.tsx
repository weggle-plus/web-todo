import React from "react";
import useTodoList from "./hooks/useTodoList";
import Sidebar from "./components/Sidebar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./assets/App.css";

const App: React.FC = () => {
  const {
    todos,
    done,
    inputValue,
    setInputValue,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    editingTodoId,
    editingText,
    setEditingText,
    startEditing,
    saveEditing,
    cancelEditing,
  } = useTodoList();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <TodoInput 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          handleAddTodo={handleAddTodo} 
        />
        <TodoList 
          todos={todos} 
          done={done} 
          handleToggleTodo={handleToggleTodo} 
          handleDeleteTodo={handleDeleteTodo}
          editingTodoId={editingTodoId}
          editingText={editingText}
          setEditingText={setEditingText}
          startEditing={startEditing}
          saveEditing={saveEditing}
          cancelEditing={cancelEditing}
        />
      </div>
    </div>
  );
};

export default App;
