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
      console.error('Error fetching todos:', err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows); // 결과를 JSON 형태로 반환
    }
  });

})

// 2. TO DO 항목 추가 | POST | /todos | 새로운 TO DO 행 추가
router.post('/', (req, res) => {
  const {title} = req.body; 

  db.run(`INSERT INTO todos (title) VALUES (?)`, [title], (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  })

})

// 3. TO DO 체크박스 클릭 | PATCH | /todos/:id | 해당 TO DO을 DONE으로 상태 변경

// 4. TO DO 제목 수정 | PUT | /todos/:id | 해당 TO DO의 제목 수정

// 5. TO DO 항목 삭제 | DELETE | /todos/:id | 해당 TO DO를 삭제


module.exports = router;
