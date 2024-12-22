import axios from "axios";
import localStorageModule from "./utils/localStorage";

const login = async (loginData) => {
  try {
    const response = await axios.post("http://localhost:4040/login", loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const join = async (joinData) => {
  try {
    const response = await axios.post("http://localhost:4040/signup", joinData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTodoItems = async () => {
  const token = localStorageModule.get("token");
  try {
    const response = await axios.get("http://localhost:4040/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error : ", error);
    alert("할 일 목록 데이터 가져오기에 실패하였습니다.");
  }
};

const addTodoItem = async () => {
  let inputTodoElement = document.getElementById("input_todo");
  const token = localStorageModule.get("token");
  try {
    let todoTitle = inputTodoElement.value;
    await axios.post(
      "http://localhost:4040/todos",
      {
        title: todoTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    inputTodoElement.value = "";
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
  const token = localStorageModule.get("token");

  try {
    await axios.delete(`http://localhost:4040/todos/${clickedItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("error : ", error);
    alert("할 일을 삭제할 수 없습니다.");
  }
};

const checkDone = async (todoItem) => {
  const token = localStorageModule.get("token");
  try {
    await axios.patch(
      `http://localhost:4040/todos/${todoItem.id}`,
      {
        done: !todoItem.done,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error: ", error);
    alert("체크박스 체크 에러입니다.");
  }
};

const updateEditing = async (todoItem) => {
  const token = localStorageModule.get("token");
  try {
    await axios.put(
      `http://localhost:4040/todos/${todoItem.id}`,
      {
        title: todoItem.title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error : ", error);
    alert("수정에 실패하였습니다.");
  }
};

const apiModules = {
  login,
  join,
  getTodoItems,
  addTodoItem,
  deleteTodoItem,
  checkDone,
  updateEditing,
};

export default apiModules;
