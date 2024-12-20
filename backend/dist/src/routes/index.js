"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController_1 = require("../controllers/indexController");
const router = express_1.default.Router();
/* Todo 리스트 라우터 설정 */
router.get('/', indexController_1.getTodos); // 전체 Todo 가져오기
router.post('/', indexController_1.addTodo); // Todo 추가
router.put('/:id', indexController_1.updateTodo); // Todo 수정
router.delete('/:id', indexController_1.deleteTodo); // Todo 삭제
exports.default = router;
