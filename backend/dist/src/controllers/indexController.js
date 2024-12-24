"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const asyncHandler_1 = require("../utils/asyncHandler");
// 전체 Todo 리스트 가져오기
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.findAll(); // 전체 레코드 조회
        res.status(200).json(todos);
    }
    catch (error) {
        next(error); // 에러를 Express에 넘김
    }
});
exports.getTodos = getTodos;
// 새로운 Todo 추가
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contents } = req.body; // 요청 데이터에서 contents 가져옴
        const newTodo = yield Todo_1.default.create({ contents, isdone: false });
        res.status(201).json(newTodo);
    }
    catch (error) {
        next(error);
    }
});
exports.addTodo = addTodo;
// 특정 Todo 수정
exports.updateTodo = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { contents, isdone } = req.body;
    const todo = yield Todo_1.default.findByPk(id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    // 업데이트
    todo.contents = contents !== null && contents !== void 0 ? contents : todo.contents;
    todo.isdone = isdone !== null && isdone !== void 0 ? isdone : todo.isdone;
    yield todo.save();
    res.status(200).json(todo);
}));
// 특정 Todo 삭제
exports.deleteTodo = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo_1.default.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        yield todo.destroy(); // 레코드 삭제
        res.status(204).send(); // 성공적으로 삭제된 경우 응답 본문은 없음
    }
    catch (error) {
        next(error);
    }
}));
