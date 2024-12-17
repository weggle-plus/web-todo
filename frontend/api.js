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
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버 오류");
      }
      return res.json();
    })
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
                          <button class="btn_red_line delete">삭제</button>
                        </span>
  
                        <span class="confirm_btn_wrap">
                          <button class="btn_0f confirm">완료</button>
                          <button class="btn_gray_line cancel">취소</button>
                        </span>
                      </span>
                  </li>
                  `
        );
      });
    })
    .catch((error) => {
      console.error("에러", error);
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

export { patchContent, getTodos, postTodo };
