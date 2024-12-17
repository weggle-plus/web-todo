var express = require('express');
var router = express.Router();
var db = require('../datebase/db')
var {StatusCodes} = require('http-status-codes'); // status code 모듈

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
  
// });

// 1. 메인 페이지 조회 | GET | /todos | TO DO와 DONE 목록 조회
router.get('/', (req, res) => {

  const sql = `SELECT * FROM todos`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal Server Error: ${err.message}` });
    }
    return res.status(StatusCodes.OK).json(rows); // 결과를 JSON 형태로 반환
  });

})

// 2. TO DO 항목 추가 | POST | /todos | 새로운 TO DO 행 추가
router.post('/', (req, res) => {
  const {title} = req.body;

  // 유효성 검사: title이 undefined이거나 공백일 경우
  if (!title || !title.trim()) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: "Invalid input format" });
  }

  db.run(`INSERT INTO todos (title) VALUES (?)`, [title], (err) => {
    if(err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Error adding TO DO: ${err.message}` });
    }
    return res.status(StatusCodes.CREATED)
    .json({ message : "TO DO created successfully" });
  })

})

// 3. TO DO 체크박스 클릭 | PATCH | /todos/:id | 해당 TO DO을 DONE으로 상태 변경

// 4. TO DO 제목 수정 | PUT | /todos/:id | 해당 TO DO의 제목 수정

// 5. TO DO 항목 삭제 | DELETE | /todos/:id | 해당 TO DO를 삭제


module.exports = router;
