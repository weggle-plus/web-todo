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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
// 유저 전체 todo 리스트
var todos = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
addButton.addEventListener("click", function () {
    var content = todoInput.value;
    if (!content)
        return;
    var newTodo = { id: Date.now(), content: content, isDone: false };
    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();
});
function renderTodos() {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        // 리스트 아이템 생성
        var li = document.createElement('li');
        li.textContent = todo.content;
        // 체크박스 생성
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.isDone;
        // 리스트 아이템에 체크박스 추가
        li.appendChild(checkBox);
        // 체크박스 이벤트 리스너 등록
        checkBox.addEventListener('change', function (event) {
            var target = event.target;
            todo.isDone = target.checked;
            if (todo.isDone) {
                doneList.appendChild(li);
            }
            else {
                todoList.appendChild(li);
            }
        });
        if (todo.isDone) {
            doneList.appendChild(li);
        }
        else {
            todoList.appendChild(li);
        }
    });
}
getUserTodoList();
// 유저 할일목록 받기기
function getUserTodoList() {
    return __awaiter(this, void 0, void 0, function () {
        var url, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "localhost:3000/todos";
                    return [4 /*yield*/, (0, api_1.fetchData)(url)];
                case 1:
                    todos = _a.sent();
                    console.log(todos);
                    return [2 /*return*/];
            }
        });
    });
}
