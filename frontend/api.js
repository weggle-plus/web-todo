import { createDoneTag, createTodoTag } from "./createTag.js";

const URL = "http://localhost:8080/todo";

function getTodos() {
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 오류");
      return res.json();
    })
    .then((data) => {
      data.map((item) => {
        if (item.is_done) {
          return createDoneTag(item.id, item.content);
        }

        createTodoTag(item.id, item.content);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function postTodo(value) {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 에러", err);
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function patchStatus(id, value) {
  fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isDone: value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 오류");
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function patchContent(id, value) {
  fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: value,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 오류");
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteTodo(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 오류");
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export { getTodos, postTodo, patchStatus, patchContent, deleteTodo };
