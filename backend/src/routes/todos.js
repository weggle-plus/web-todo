const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');

// TODO 생성
router.post('/', 
  async (req, res) => {
    await todoController.createTodo(req, res);
  }
);

// TODO 조회
router.get('/', 
  async (req, res) => {
    await todoController.getTodos(req, res);
  }
);

// TODO 업데이트
router.put('/:id', 
  async (req, res) => {
    await todoController.updateTodo(req, res);
  }
);

// TODO 상태 업데이트
router.patch('/:id', 
  async (req, res) => {
    await todoController.updateTodoStatus(req, res);
  }
);

// TODO 삭제
router.delete('/:id', 
  async (req, res) => {
    await todoController.deleteTodo(req, res);
  }
);

module.exports = router;