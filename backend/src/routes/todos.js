const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');

router.post('/', async (req, res) => {
  await todoController.createTodo(req, res);
});
router.get('/', async (req, res) => {
  await todoController.getAllTodos(req, res);
});
router.get('/:id', async (req, res) => {
  await todoController.getTodoById(req, res);
});
router.put('/:id', async (req, res) => {
  await todoController.updateTodo(req, res);
});
router.patch('/:id', async (req, res) => {
  await todoController.updateTodoStatus(req, res);
});
router.delete('/:id', async (req, res) => {
  await todoController.deleteTodo(req, res);
});

module.exports = router;