import axios from "axios";

let clickedItemId = null;
let todoList = [];

const login = async (loginData) => {
  try {
    const response = await axios.post("http://localhost:4040/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTodoItems = async () => {
  try {
    const response = await axios.get("http://localhost:4040/todos");
    return (todoList = response.data);
  } catch (error) {
    console.log("error : ", error);
    alert("할 일 목록 데이터 가져오기에 실패하였습니다.");
  }
};

const addTodoItem = async () => {
  let inputTodoElement = document.getElementById("input_todo");
  try {
    let todoTitle = inputTodoElement.value;
    await axios.post("http://localhost:4040/todos", {
      title: todoTitle,
    });
    console.log("todo added : ", todoTitle);
    inputTodoElement.value = "";
    getTodoItems();
  } catch (error) {
    inputTodoElement.value = "";
    console.log("error : ", error);
    if (error.status === 400) {
      alert("입력값이 필요합니다.");
    } else {
      alert("할 일을 저장할 수 없습니다.");
    }
  }
};

const deleteTodoItem = async (clickedItemId) => {
  try {
    await axios.delete(`http://localhost:4040/todos/${clickedItemId}`);
    clickedItemId = null;
    getTodoItems();
  } catch (error) {
    console.log("error : ", error);
    alert("할 일을 삭제할 수 없습니다.");
  }
};

const checkDone = async (todoItem) => {
  try {
    await axios.patch(`http://localhost:4040/todos/${todoItem.id}`, {
      done: !todoItem.done,
    });
  } catch (error) {
    console.log("error: ", error);
    alert("체크박스 체크 에러입니다.");
  }
  getTodoItems();
};

const updateEditing = async (todoItem) => {
  try {
    await axios.put(`http://localhost:4040/todos/${todoItem.id}`, {
      title: todoItem.title,
    });
  } catch (error) {
    console.log("error : ", error);
    alert("수정에 실패하였습니다.");
  }
  getTodoItems();
};

const apiModules = {
  login,
  getTodoItems,
  addTodoItem,
  deleteTodoItem,
  checkDone,
  updateEditing,
  clickedItemId,
  todoList,
};

export default apiModules;
