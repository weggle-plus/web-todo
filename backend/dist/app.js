"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
dotenv_1.default.config();
const secret = process.env.COOKIE_SECRET || "default-secret-key";
// 라우터들
const index_1 = __importDefault(require("./src/routes/index"));
const users_1 = __importDefault(require("./src/routes/users"));
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.set('view engine', 'pug');
// 미들웨어 설정
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(secret));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// 라우터 연결
app.use('/', index_1.default);
app.use('/users', users_1.default);
// 404 처리 미들웨어
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// 에러 핸들러
app.use(function (err, req, res, next) {
    // 개발 모드에서만 상세 에러 정보를 반환
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // 에러 페이지 렌더링
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
