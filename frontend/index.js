import { postTodo, patchContent, getTodos, deleteTodo } from "./api.js";

const addBtn = document.getElementById("register");
const inputContainer = document.getElementById("getData");

inputContainer.addEventListener("click", (event) => {
  const target = event.target;

  const group = target.closest(".contents_list");
  const input = group.querySelector(".readonly");
  const confirm = group.querySelector(".confirm");
  const btnWrap = group.querySelector(".edit_btn_wrap");
  const confirmWrap = group.querySelector(".confirm_btn_wrap");
  const id = group.dataset.id;

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
    location.reload();
  }

  if (target.classList.contains("delete")) {
    document.querySelectorAll(".delete_popup").forEach((popup) => {
      popup.style.display = "grid";

      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-confirm")) {
          deleteTodo(id);
          location.reload();
        }
      });
    });
  }
});

function registerData() {
  postTodo();
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => getTodos());

addBtn.addEventListener("click", () => registerData());

// document.querySelectorAll(".btn_0f, .btn_gray_line").forEach(function (button) {
//   button.addEventListener("click", function () {
//     document.querySelectorAll(".delete_popup").forEach(function (popup) {
//       popup.style.display = "none";
//     });
//   });
// });
