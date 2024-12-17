import { patchContentAPI, getTodosAPI, deleteTodoAPI, patchStatusAPI, postTodoAPI } from "./api.js";

const addBtn = document.getElementById("register");
const todoList = document.getElementById("getTodoData");
const doneList = document.getElementById("getDoneData");
const popup = document.querySelector(".delete_popup");
const confirm = popup.querySelector(".delete-confirm");
const cancel = popup.querySelector(".delete-cancel");
let deleteId = 0;

function registerData() {
  const inputData = document.getElementById("newTodo").value;

  postTodoAPI(inputData);
  reset();
  document.getElementById("newTodo").value = "";
}

function reset() {
  todoList.textContent = "";
  doneList.textContent = "";

  getTodosAPI();
}

function updateTodo(group) {
  const input = group.querySelector(".readonly");
  const btnWrap = group.querySelector(".edit_btn_wrap");
  const confirmWrap = group.querySelector(".confirm_btn_wrap");
  const checkBox = group.querySelector(".checkBox");

  input.removeAttribute("disabled");
  input.focus();

  btnWrap.style.display = "none";
  confirmWrap.style.display = "block";
  checkBox.style.display = "none";
}

function cancelTodo(group) {
  const input = group.querySelector(".readonly");
  const btnWrap = group.querySelector(".edit_btn_wrap");
  const confirmWrap = group.querySelector(".confirm_btn_wrap");
  const checkBox = group.querySelector(".checkBox");

  input.setAttribute("disabled", true);

  confirmWrap.style.display = "none";
  btnWrap.style.display = "block";
  checkBox.style.display = "block";
}

function confirmTodo(group) {
  const id = group.dataset.id;
  const input = group.querySelector(".readonly");
  const btnWrap = group.querySelector(".edit_btn_wrap");
  const confirmWrap = group.querySelector(".confirm_btn_wrap");

  input.setAttribute("disabled", true);

  btnWrap.style.display = "block";
  confirmWrap.style.display = "none";

  patchContentAPI(id, input.value);
  reset();
}

function checkTodo(group) {
  const id = group.dataset.id;
  const checkBox = group.querySelector(".checkBox");

  patchStatusAPI(id, checkBox.checked);
  reset();
}

function deleteTodo() {
  popup.style.display = "none";

  deleteTodoAPI(deleteId);
  reset();
}

todoList.addEventListener("click", (event) => {
  const target = event.target;
  const group = target.closest(".contents_list");

  if (target.classList.contains("update")) updateTodo(group);
  if (target.classList.contains("cancel")) cancelTodo(group);
  if (target.classList.contains("confirm")) confirmTodo(group);
  if (target.classList.contains("checkBox")) checkTodo(group);
  if (target.classList.contains("delete")) {
    popup.style.display = "grid";
    deleteId = group.dataset.id;
  }
});

doneList.addEventListener("click", (event) => {
  const target = event.target;
  const group = target.closest(".contents_list");

  if (target.classList.contains("checkBox")) checkTodo(group);
  if (target.classList.contains("delete")) {
    popup.style.display = "grid";
    deleteId = group.dataset.id;
  }
});

confirm.addEventListener("click", () => deleteTodo());

cancel.addEventListener("click", () => (popup.style.display = "none"));

addBtn.addEventListener("click", () => registerData());

document.addEventListener("DOMContentLoaded", () => getTodosAPI());
