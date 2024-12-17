import apiModule from "./api.js";

let editingItemId = null;
let todoList = [];

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
      checkBox.addEventListener("click", () => apiModule.checkDone(item));

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
      saveButton.addEventListener("click", () => {
        apiModule.finishEditing(item, true);
        editingItemId = null;
      });

      const cancelButton = document.createElement("button");
      cancelButton.classList.add("btn_modify");
      cancelButton.textContent = "취소";
      cancelButton.addEventListener("click", () => {
        apiModule.finishEditing(item, false);
        editingItemId = null;
      });

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

const modifyTitle = (id) => {
  editingItemId = id;
  apiModule.getTodoItems().then((value) => {
    todoList = value;
    renderTodoItems();
  });
};

const modalPop = (id) => {
  apiModule.clickedItemId = id;
  document.getElementById("modal_container").classList.remove("hidden");
};

const modalClose = (isDelete) => {
  if (isDelete) {
    apiModule.deleteTodoItem(apiModule.clickedItemId);
  }
  apiModule.clickedItemId = null;
  document.getElementById("modal_container").classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  apiModule.getTodoItems().then((value) => {
    todoList = value;
    renderTodoItems();
  });
  const addTodoButton = document.getElementById("add_todo_btn");
  addTodoButton.addEventListener("click", apiModule.addTodoItem);
  const modalCloseTrueButton = document.getElementById("modal_close_true_btn");
  modalCloseTrueButton.addEventListener("click", () => {
    modalClose(true);
  });
  const modalCloseFalseButton = document.getElementById("modal_close_true_btn");
  modalCloseFalseButton.addEventListener("click", () => {
    modalClose(false);
  });
});
