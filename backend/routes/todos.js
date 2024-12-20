var express = require("express");
var router = express.Router();
var db = require("../datebase/db");
var { StatusCodes } = require("http-status-codes"); // status code 모듈

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });

// });

// 1. 메인 페이지 조회 | GET | /todos | TO DO와 DONE 목록 조회
router.get("/", (_, res) => {
  const sql = `SELECT * FROM todos`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${err.message}` });
    }
    return res.status(StatusCodes.OK).json(rows); // 결과를 JSON 형태로 반환
  });
});

// 2. TO DO 항목 추가 | POST | /todos | 새로운 TO DO 행 추가
router.post("/", (req, res) => {
  const { title } = req.body;
  const sql = `INSERT INTO todos (title) VALUES (?)`;

  // 유효성 검사: title이 undefined이거나 공백일 경우
  if (!title || !title.trim()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input format" });
  }

  db.run(sql, [title], (err) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error adding TO DO: ${err.message}` });
    }
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "TO DO created successfully" });
  });
});

// 3. TO DO 체크박스 클릭 | PATCH | /todos/:id | 해당 TO DO을 DONE으로 상태 변경
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const sql = `UPDATE todos SET done = ? WHERE id = ?;`;

  db.get(`SELECT * FROM todos WHERE id = ?;`, [id], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }
    if (!row) {
      // DB에 해당 id가 존재하지 않으면
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    // id가 존재할 경우, done 값을 업데이트
    db.run(sql, [done, id], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error updating TO DO's done: ${err.message}` });
      }

      return res.status(StatusCodes.OK).json({ id, done });
    });
  });
});

// 4. TO DO 제목 수정 | PUT | /todos/:id | 해당 TO DO의 제목 수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const sql = `UPDATE todos SET title = ? WHERE id = ?;`;

  // 유효성 검사: title이 undefined이거나 공백일 경우
  if (!title || !title.trim()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid input format" });
  }

  db.get(`SELECT * FROM todos WHERE id = ?;`, [id], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }

    if (!row) {
      // DB에 해당 id가 존재하지 않으면
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    // title 값이 기존과 동일하다면 db.run을 실행할 필요가 없는데 그 조건을 써야할까?
    db.run(sql, [title, id], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error updating TO DO's title: ${err.message}` });
      }

      return res.status(StatusCodes.OK).json({ id, title });
    });
  });
});

// 5. TO DO 항목 삭제 | DELETE | /todos/:id | 해당 TO DO를 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM todos WHERE id = ?;`;

  db.get(`SELECT * FROM todos WHERE id = ?;`, [id], (err, row) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Error finding TO DO's id: ${err.message}` });
    }

    if (!row) {
      // DB에 해당 id가 존재하지 않으면
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "TO DO id not found" });
    }

    db.run(sql, [id], function (err) {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Error deleting TO DO: ${err.message}` });
      }

      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ message: "TO DO deleted successfully", id });
    });
  });
});

module.exports = router;

// cf. sqlite의 경우 화살표 함수를 사용할 때 this 오류가 발생한다.
// 화살표 함수는 this를 부모 스코프에서 가져오기 때문이다.
