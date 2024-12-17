const addBtn = document.getElementById("register");

const inputContainer = document.getElementById("getData");

inputContainer.addEventListener("click", function (event) {
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

  if (target.classList.contains("confirm")) {
    input.setAttribute("readonly", true);

    btnWrap.style.display = "block";
    confirmWrap.style.display = "none";
    patchContent(id, input.value);
    location.reload();
  }
});

function patchContent(id, value) {
  fetch(`http://localhost:8080/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: value,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버 오류");
      }
      return res.json();
    })
    .then((data) => {
      console.log("성공", data);
    })
    .catch((error) => {
      console.error("에러", error);
    });
}

function getTodos() {
  fetch("http://localhost:8080/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const ul = document.getElementById("getData");
      data.map((item) => {
        ul.insertAdjacentHTML(
          "beforeend",
          `
                <li data-id=${item.id} class="contents_list" >
                    <div>
                      <input type="checkbox" />
                      <input for="" value="${item.content}"  readonly  class="readonly">
                    </div>
                    <span class="input_btn_wrap">
                      <span class="edit_btn_wrap">
                        <button class="btn_gray_line update">수정</button>
                        <button class="btn_red_line">삭제</button>
                      </span>

                      <span class="confirm_btn_wrap">
                        <button class="btn_0f confirm">완료</button>
                        <button class="btn_gray_line">취소</button>
                      </span>
                    </span>
                </li>
                `
        );
      });
    });
}

function postTodo() {
  const inputData = document.getElementById("newTodo").value;
  fetch("http://localhost:8080/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: inputData,
    }),
  });
}

function registerData() {
  postTodo();
  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

addBtn.addEventListener("click", function () {
  registerData();
  console.log("클릭");
});

// 팝업 클릭
document.querySelectorAll(".btn_red_line").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".delete_popup").forEach(function (popup) {
      popup.style.display = "grid";
    });
  });
});

document.querySelectorAll(".btn_0f, .btn_gray_line").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".delete_popup").forEach(function (popup) {
      popup.style.display = "none";
    });
  });
});
