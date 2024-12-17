import { createDoneTag, createNoDoneTag, createNoTodoTag, createTodoTag } from "./createTag.js";

const URL = "http://localhost:8080/todo";

function getTodosAPI() {
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
      let todoCount = 0;
      let doneCount = 0;

      data.map((item) => {
        if (item.is_done) {
          doneCount += 1;
          return createDoneTag(item.id, item.content);
        }

        todoCount += 1;
        createTodoTag(item.id, item.content);
      });

      if (!todoCount) createNoTodoTag();
      if (!doneCount) createNoDoneTag();
    })
    .catch((error) => {
      console.error(error);
    });
}

function postTodoAPI(value) {
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

function patchStatusAPI(id, value) {
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

function patchContentAPI(id, value) {
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

function deleteTodoAPI(id) {
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

export { getTodosAPI, postTodoAPI, patchStatusAPI, patchContentAPI, deleteTodoAPI };
