let clickedItemId = null;
let editingItemId = null;
let todoList = [];

const getTodoItems = async () => {
  try {
    const response = await axios.get("http://localhost:4040/todos");
    todoList = response.data;
    renderTodoItems();
  } catch (error) {
    console.log("error : ", error);
    alert("할 일 목록 데이터 가져오기에 실패하였습니다.");
  }
};

const renderTodoItems = () => {
  const todoListElement = document.getElementById("todo_list");
  const doneListElement = document.getElementById("done_list");
  todoListElement.innerHTML = "";
  doneListElement.innerHTML = "";
  let isTodoEmpty = true;
  let isDoneEmpty = true;

  if (todoList.length !== 0) {
    todoList.forEach((item) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo_item");

      const titleInput = document.createElement("input");
      if (editingItemId === item.id) {
        titleInput.type = "text";
        titleInput.value = item.title;
        titleInput.id = `title_input_${item.id}`;
      }

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.id = `todo_check_${item.id}`;
      checkBox.checked = item.done;
      checkBox.addEventListener("click", () => checkDone(item));

      const itemLabel = document.createElement("label");
      itemLabel.setAttribute("for", checkBox.id);
      itemLabel.style = "flex: 1";
      itemLabel.textContent = item.title;

      const modifyButton = document.createElement("button");
      modifyButton.classList.add("btn_modify");
      modifyButton.textContent = "수정";
      modifyButton.addEventListener("click", () => modifyTitle(item.id));

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn_delete");
      deleteButton.textContent = "삭제";
      deleteButton.addEventListener("click", () => modalPop(item.id));

      const saveButton = document.createElement("button");
      saveButton.textContent = "완료";
      saveButton.addEventListener("click", () => finishEditing(item, true));

      const cancelButton = document.createElement("button");
      cancelButton.classList.add("btn_modify");
      cancelButton.textContent = "취소";
      cancelButton.addEventListener("click", () => finishEditing(item, false));

      if (item.done) {
        todoItem.append(checkBox, itemLabel, deleteButton);
        doneListElement.append(todoItem);
        isDoneEmpty = false;
      } else {
        editingItemId === item.id
          ? todoItem.append(titleInput, saveButton, cancelButton)
          : todoItem.append(checkBox, itemLabel, modifyButton, deleteButton);
        todoListElement.append(todoItem);
        isTodoEmpty = false;
      }
    });
  }

  if (isTodoEmpty) {
    const todoNoneSpan = document.createElement("span");
    todoNoneSpan.textContent = "할 일 항목이 없습니다.";
    todoListElement.append(todoNoneSpan);
  }
  if (isDoneEmpty) {
    const doneNoneSpan = document.createElement("span");
    doneNoneSpan.textContent = "완료 항목이 없습니다.";
    doneListElement.append(doneNoneSpan);
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

const modifyTitle = (id) => {
  editingItemId = id;
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
      editingItemId = null;
    } catch (error) {
      console.log("error : ", error);
      alert("수정에 실패하였습니다.");
    }
  } else {
    editingItemId = null;
  }
  getTodoItems();
};

const modalPop = (id) => {
  clickedItemId = id;
  document.getElementById("modal_container").classList.remove("hidden");
};

const modalClose = (isDelete) => {
  if (isDelete) {
    deleteTodoItem(clickedItemId);
  }
  clickedItemId = null;
  document.getElementById("modal_container").classList.add("hidden");
};

const addItem = () => {
  console.log("add");
};

document.addEventListener("DOMContentLoaded", () => {
  getTodoItems();
  const addTodoButton = document.getElementById("add_todo_btn");
  addTodoButton.addEventListener("click", addTodoItem);
  const modalCloseTrueButton = document.getElementById("modal_close_true_btn");
  modalCloseTrueButton.addEventListener("click", () => {
    modalClose(true);
  });
  const modalCloseFalseButton = document.getElementById("modal_close_true_btn");
  modalCloseFalseButton.addEventListener("click", () => {
    modalClose(false);
  });
});
