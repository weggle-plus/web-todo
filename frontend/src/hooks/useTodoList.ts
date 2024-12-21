import { useState, useEffect } from "react";
import todoAPI, { Todo } from "../service/todoAPI";

const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]); // DONE 상태 추가
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // TODO 데이터를 서버에서 가져오는 함수
  const fetchTodos = async () => {
    try {
      const fetchedTodos = await todoAPI.getTodos();
      const todosList = fetchedTodos.filter((todo) => !todo.status); // 미완료 항목 분리
      const doneList = fetchedTodos.filter((todo) => todo.status); // 완료 항목 분리
      setTodos(todosList);
      setDone(doneList);
    } catch (error) {
      console.error("할 일 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 TODO 데이터를 가져옴
  useEffect(() => {
    fetchTodos();
  }, []);

  // 새로운 TODO를 추가하는 함수
  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      try {
        await todoAPI.addTodo(inputValue, false);
        setInputValue("");
        await fetchTodos(); // 새 데이터를 서버에서 다시 가져옴
      } catch (error) {
        console.error("할 일을 추가하는 데 실패했습니다:", error);
      }
    }
  };

  // TODO 항목을 삭제하는 함수
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoAPI.deleteTodo(id);
      await fetchTodos(); // 삭제 후 데이터 동기화
    } catch (error) {
      console.error("할 일을 삭제하는 데 실패했습니다:", error);
    }
  };

  // TODO 상태를 토글하는 함수 (완료 ↔ 미완료)
  const handleToggleTodo = async (id: number) => {
    try {
      // 기존 TODO 항목 찾기
      const existingTodo = [...todos, ...done].find((todo) => todo.id === id);
      if (!existingTodo) return;

      // 상태 반전 (완료 ↔ 미완료)
      const status = !existingTodo.status;
      await todoAPI.updateTodoStatus(id, status);
      await fetchTodos(); // 토글 후 데이터 동기화
    } catch (error) {
      console.error("할 일 상태를 변경하는 데 실패했습니다:", error);
    }
  };

  // 수정 모드로 전환하는 함수
  const startEditing = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  // 수정된 TODO 항목을 저장하는 함수
  const saveEditing = async () => {
    if (editingTodoId !== null) {
      try {
        // 기존 TODO 항목 찾기
        const existingTodo = [...todos, ...done].find((todo) => todo.id === editingTodoId);
        if (!existingTodo) return;

        // 서버에 수정 요청
        await todoAPI.updateTodo(editingTodoId, {
          title: editingText || existingTodo.title, // 제목 수정 (없으면 기존 제목 유지)
          status: existingTodo.status,             // 상태는 그대로 유지
        });
        setEditingTodoId(null);
        setEditingText("");
        await fetchTodos(); // 수정 후 데이터 동기화
      } catch (error) {
        console.error("할 일 수정을 저장하는 데 실패했습니다:", error);
      }
    }
  };

  // 수정 모드를 취소하는 함수
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
