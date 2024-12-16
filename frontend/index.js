function registerData() {
  var inputData = document.getElementById("newTodo").value;

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

const addBtn = document.getElementById("register");
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
