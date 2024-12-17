import { postTodo, patchContent, getTodos, deleteTodo, patchStatus } from "./api.js";

const addBtn = document.getElementById("register");
const todoList = document.getElementById("getTodoData");
const doneList = document.getElementById("getDoneData");
const popup = document.querySelector(".delete_popup");
const confirm = popup.querySelector(".delete-confirm");
const cancel = popup.querySelector(".delete-cancel");
let deleteId = 0;

function registerData() {
  const inputData = document.getElementById("newTodo").value;
  postTodo(inputData);
  reset();
}

function reset() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  getTodos();
}

todoList.addEventListener("click", (event) => {
  const target = event.target;

  const group = target.closest(".contents_list");
  const input = group.querySelector(".readonly");
  const btnWrap = group.querySelector(".edit_btn_wrap");
  const confirmWrap = group.querySelector(".confirm_btn_wrap");
  const id = group.dataset.id;
  const checkBox = group.querySelector(".checkBox");

  if (target.classList.contains("update")) {
    input.removeAttribute("readonly");
    input.focus();

    btnWrap.style.display = "none";
    confirmWrap.style.display = "block";
  }

  if (target.classList.contains("cancel")) {
    input.setAttribute("readonly", true);

    confirmWrap.style.display = "none";
    btnWrap.style.display = "block";
  }

  if (target.classList.contains("confirm")) {
    input.setAttribute("readonly", true);

    btnWrap.style.display = "block";
    confirmWrap.style.display = "none";
    patchContent(id, input.value);
    reset();
  }

  if (target.classList.contains("delete")) {
    popup.style.display = "grid";

    deleteId = id;
  }

  if (target.classList.contains("checkBox")) {
    patchStatus(id, checkBox.checked);
    reset();
  }
});

doneList.addEventListener("click", (event) => {
  const target = event.target;
  const group = target.closest(".contents_list");
  const id = group.dataset.id;
  const checkBox = group.querySelector(".checkBox");

  if (target.classList.contains("delete")) {
    popup.style.display = "grid";
    deleteId = id;
  }

  if (target.classList.contains("checkBox")) {
    patchStatus(id, checkBox.checked);
    reset();
  }
});

confirm.addEventListener("click", () => {
  deleteTodo(deleteId);
  reset();
  popup.style.display = "none";
});

cancel.addEventListener("click", () => {
  popup.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => getTodos());

addBtn.addEventListener("click", () => registerData());
