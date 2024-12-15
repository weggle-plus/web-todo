const TodoService = require('../services/TodoService');
const TodoMariaRepository = require('../models/mariadb/TodoMariaRepository');

const todoService = new TodoService(new TodoMariaRepository());

class TodoController {
  async createTodo(req, res) {
    try {
      const todo = await todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTodos(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
}

module.exports = TodoController;