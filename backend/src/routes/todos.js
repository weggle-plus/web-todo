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
  async (req, res) => {
    await todoController.getUserTodos(req, res);
  }
);

router.get('/:id', 
  todoController.validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.getTodoById(req, res, next);
  }
);

router.get('/team/:teamId', 
  todoController.validateTeamIdParam, 
  async (req, res, next) => {
    await todoController.getTeamTodos(req, res, next);
  }
);

router.post('/team/:teamId', 
  todoController.validateTeamIdParam, 
  async (req, res, next) => {
    await todoController.createTeamTodo(req, res, next);
  }
);


router.put('/:id', 
  todoController.validateTodo,
  todoController.validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.updateTodo(req, res, next);
  }
);

router.patch('/:id', 
  todoController.validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.updateTodoStatus(req, res, next);
  }
);

router.delete('/:id', 
  todoController.validateTodoIdParam, 
  async (req, res, next) => {
    await todoController.deleteTodo(req, res, next);
  }
);

module.exports = router;