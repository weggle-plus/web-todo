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
const sequelize_1 = __importDefault(require("../config/sequelize"));
const Todo_1 = __importDefault(require("./Todo"));
// 모델을 sequelize 인스턴스에 등록
sequelize_1.default.models.Todo = Todo_1.default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 스키마 확인 및 생성
        yield sequelize_1.default.query('CREATE SCHEMA IF NOT EXISTS Todo_List');
        console.log('스키마 확인 또는 생성 완료');
        // 모델 동기화
        yield sequelize_1.default.sync({ force: false });
        console.log('모델 동기화 완료');
    }
    catch (error) {
        console.error('데이터베이스 초기화 중 에러 발생:', error);
    }
}))();
