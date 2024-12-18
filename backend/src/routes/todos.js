const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.authenticate);

router.post('/', 
  todoController.validateTodo, 
  async (req, res, next) => {
    await todoController.createTodo(req, res, next);
  }
);

router.get('/', 
  async (req, res, next) => {
    await todoController.getAllUserTodos(req, res, next);
  }
);

router.get('/:id', 
  todoController.validateTodoId, 
  async (req, res, next) => {
    await todoController.getTodoById(req, res, next);
  }
);

router.put('/:id', 
  todoController.validateTodo,
  todoController.validateTodoId, 
  async (req, res, next) => {
    await todoController.updateTodo(req, res, next);
  }
);

router.patch('/:id/status', 
  todoController.validateTodoStatus,
  todoController.validateTodoId, 
  async (req, res, next) => {
    await todoController.updateTodoStatus(req, res, next);
  }
);

router.delete('/:id', 
  todoController.validateTodoId, 
  async (req, res, next) => {
    await todoController.deleteTodo(req, res, next);
  }
);

module.exports = router;