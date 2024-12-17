//axios 호출 관련 함수
let clickedItemId = null;
let todoList = [];

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
    const response = await axios.post("http://localhost:4040/todos", {
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
    const response = await axios.delete(
      `http://localhost:4040/todos/${clickedItemId}`
    );
    clickedItemId = null;
    getTodoItems();
  } catch (error) {
    console.log("error : ", error);
    alert("할 일을 삭제할 수 없습니다.");
  }
};

const checkDone = async (todoItem) => {
  try {
    const response = await axios.patch(
      `http://localhost:4040/todos/${todoItem.id}`,
      {
        done: !todoItem.done,
      }
    );
  } catch (error) {
    console.log("error: ", error);
    alert("체크박스 체크 에러입니다.");
  }
  getTodoItems();
};

const finishEditing = async (todoItem, isEdited) => {
  if (isEdited) {
    try {
      let todoInput = document.getElementById(`title_input_${todoItem.id}`);
      const response = await axios.put(
        `http://localhost:4040/todos/${todoItem.id}`,
        {
          title: todoInput.value,
        }
      );
    } catch (error) {
      console.log("error : ", error);
      alert("수정에 실패하였습니다.");
    }
  }
  getTodoItems();
};

export default {
  getTodoItems,
  addTodoItem,
  deleteTodoItem,
  checkDone,
  finishEditing,
  clickedItemId,
  todoList,
};
