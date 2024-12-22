// 필요한 외부 모듈 불러오기
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { initializeDatabase } = require("./src/config/database");
const cors = require("cors");
// 환경변수 설정 로드
const dotenv = require("dotenv");
dotenv.config();

// 라우터 모듈 불러오기
const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const todosRouter = require("./src/routes/todos");
const teamsRouter = require("./src/routes/teams");

// Express 애플리케이션 생성
const app = express();

// 뷰 엔진 설정
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// 미들웨어 설정
app.use(logger("dev")); // 로깅 미들웨어
app.use(express.json()); // JSON 파싱 미들웨어
app.use(express.urlencoded({ extended: false })); // URL 인코딩 미들웨어
app.use(cookieParser()); // 쿠키 파싱 미들웨어
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(cors()); // TODO: 프로덕션 환경에서는 수정

// 데이터베이스 초기화
initializeDatabase().catch(console.error);

// 라우터 설정
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todosRouter);
app.use("/teams", teamsRouter);

// 404 에러 처리 미들웨어
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use((err, req, res, next) => {
  // ServiceError나 AuthError 처리
  if (err.name === "ServiceError" || err.name === "AuthError") {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // 기타 에러 처리
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;
