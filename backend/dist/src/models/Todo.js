"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize")); // Sequelize 인스턴스 import
class Todo extends sequelize_1.Model {
}
// Todo 모델 정의
Todo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contents: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isdone: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: sequelize_2.default, // 연결된 sequelize 인스턴스
    modelName: 'Todo',
    tableName: 'todo', // 실제 데이터베이스의 테이블 이름
    timestamps: false,
});
exports.default = Todo;
