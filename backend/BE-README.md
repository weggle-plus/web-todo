# BE 설계

## DB 설계
1. todo_app (DB)를 만든다.
2. 테이블로 todos를 만든다.
3. id(PK), title : VARCHAR(200), done : BOOLEAN(false)으로 만든다.
4. 할 일을 입력 후 등록하기를 누르면 todos에 새로운 행(row)가 생성된다.
5. TO DO 체크박스를 누르면, 해당하는 TO DO의 done을 true로 변경한다.
6. 수정을 누르면 해당 TO DO의 title을 수정할 수 있고, 완료를 누르면
해당 TO DO의 title 값을 변경한다.
7. 삭제를 누르면 해당 행(row)이 삭제된다.

## API 설계
1. 메인 페이지 조회 | GET | /todos | TO DO와 DONE 목록 조회
2. TO DO 항목 추가 | POST | /todos | 새로운 TO DO 행 추가
3. TO DO 체크박스 클릭 | PATCH | /todos/:id | 해당 TO DO을 DONE으로 상태 변경
4. TO DO 제목 수정 | PUT | /todos/:id | 해당 TO DO의 제목 수정
5. TO DO 항목 삭제 | DELETE | /todos/:id | 해당 TO DO를 삭제

## 구현 환경
Node.js와 Express.js 사용
```
npm install express mysql2
```
## 디렉토리 구조
web-todo 파일 -> backend 폴더안에 app.js

backend 폴더 -> routes 폴더 -> index.js와 users.js

1차 과제에서는 users.js는 손을 대지 않는다.

## 해야할 일(임시) 
1. index.js를 라우터로 만든다.
2. app.js를 라우터와 연결한다.
3. SQLite를 쓴다?
```
npm install sqlite3
```