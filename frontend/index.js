const addBtn = document.getElementById("register");

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
                <li id=${item.id} class="contents_list">
                    <div>
                      <input type="checkbox" />
                      <label for="">${item.content}</label>
                    </div>
                    <span>
                      <button class="btn_gray_line">수정</button>
                      <button class="btn_red_line">삭제</button>
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
