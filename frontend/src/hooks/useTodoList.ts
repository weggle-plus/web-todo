import { useState, useEffect } from "react";
import todoAPI, { Todo } from "../service/todoAPI";

const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]); // DONE 상태 추가
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todoAPI.getTodos();
        const todosList = fetchedTodos.filter((todo) => !todo.status); // 미완료 항목
        const doneList = fetchedTodos.filter((todo) => todo.status); // 완료 항목
        setTodos(todosList);
        setDone(doneList);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      try {
        const newTodo = await todoAPI.addTodo(inputValue, false);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInputValue("");
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id: number, isTodo: boolean) => {
    try {
      await todoAPI.deleteTodo(id);
      if (isTodo) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        setDone((prevDone) => prevDone.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleTodo = async (id: number, isTodo: boolean) => {
    try {
      // 기존 todo 항목 찾기
      const existingTodo = [...todos, ...done].find((todo) => todo.id === id);
      if (!existingTodo) return;

      // 상태 반전
      const status = !existingTodo.status;
      const updatedTodo = await todoAPI.updateTodoStatus(id, status);

      // 기존 title 유지
      const completeUpdatedTodo = { ...updatedTodo, title: existingTodo.title };
  
      // 상태 업데이트
      if (completeUpdatedTodo.status) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setDone((prev) => [...prev, completeUpdatedTodo]);
      } else {
        setDone((prev) => prev.filter((todo) => todo.id !== id));
        setTodos((prev) => [...prev, completeUpdatedTodo]);
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };
  
  const startEditing = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const saveEditing = async () => {
    if (editingTodoId !== null) {
      try {
        // 기존 todo 항목 찾기
        const existingTodo = [...todos, ...done].find((todo) => todo.id === editingTodoId);
        if (!existingTodo) return;
  
        const updatedTodo = await todoAPI.updateTodo(editingTodoId, {
          title: editingText || existingTodo.title, // 새 제목 (없으면 기존 제목 유지)
          status: existingTodo.status,             // 기존 상태 유지
        });
  
        // 상태 업데이트
        if (updatedTodo.status) {
          setDone((prev) =>
            prev.map((todo) => (todo.id === editingTodoId ? updatedTodo : todo))
          );
        } else {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === editingTodoId ? updatedTodo : todo))
          );
        }
  
        setEditingTodoId(null);
        setEditingText("");
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }
  };
  
  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditingText("");
  };

  return {
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
  };
};

export default useTodoList;
