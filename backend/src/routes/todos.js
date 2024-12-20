const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');
const authMiddleware = require('../middleware/auth.middleware');
const { validateTodo, validateTodoIdParam, validateTeamIdParam } = require('../middleware/validateRequest');

router.use(authMiddleware.authenticate);

// 유저의 TODO 생성
router.post('/', 
  validateTodo, 
  async (req, res, next) => {
    await todoController.createTodo(req, res, next);
  }
);

// 유저의 TODO 조회
router.get('/', 
  async (req, res) => {
    await todoController.getUserTodos(req, res);
  }
);

// 팀의 TODO 조회
router.get('/team/:teamId', 
  validateTeamIdParam, 
  async (req, res, next) => {
    await todoController.getTeamTodos(req, res, next);
  }
);

// 팀의 TODO 생성
router.post('/team/:teamId', 
  validateTeamIdParam, 
  async (req, res, next) => {
    await todoController.createTeamTodo(req, res, next);
  }
);

// TODO 업데이트
router.put('/:id', 
  validateTodo,
  validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.updateTodo(req, res, next);
  }
);

// TODO 상태 업데이트
router.patch('/:id', 
  validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.updateTodoStatus(req, res, next);
  }
);

// TODO 삭제
router.delete('/:id', 
  validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.deleteTodo(req, res, next);
  }
);

module.exports = router;