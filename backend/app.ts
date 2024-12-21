import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
const cors = require('cors')({origin: true});

dotenv.config();
const secret = process.env.COOKIE_SECRET || "default-secret-key";

// 라우터들
import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'pug');

// 미들웨어 설정
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 처리 미들웨어
app.use(function(req: Request, res: Response, next: NextFunction): void {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err: any, req: Request, res: Response, next: NextFunction): void {
  // 개발 모드에서만 상세 에러 정보를 반환
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러 페이지 렌더링
  res.status(err.status || 500);
  res.render('error');
});
export default app;
