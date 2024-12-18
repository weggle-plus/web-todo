const { StatusCodes } = require('http-status-codes');
const TodoService = require('../services/TodoService');
const { TodoRepositoryFactory } = require('../models/RepositoryFactory');
const { ERROR_MESSAGES } = require('../constants/messages');

class TodoController {
  constructor() {
    this.todoService = new TodoService(TodoRepositoryFactory.createRepository());
  }
  async createTodo(req, res) {
    try {
      const todo = await this.todoService.createTodo(req.body);
      res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.CREATE, error: error.message });
    }
  }

  async getAllTodos(req, res) {
    try {
      const todos = await this.todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.READ, error: error.message });
    }
  } 

  async getTodoById(req, res) {
    try {
      const todo = await this.todoService.getTodoById(req.params.id);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.READ, error: error.message });
    }
  }

  async updateTodo(req, res) {
    try {
      const todo = await this.todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.UPDATE, error: error.message });
    }
  }

  async updateTodoStatus(req, res) {
    try {
      const todo = await this.todoService.updateTodoStatus(req.params.id, req.body.status);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.UPDATE, error: error.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      await this.todoService.deleteTodo(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ERROR_MESSAGES.TODO.DELETE, error: error.message });
    }
  }
}

module.exports = new TodoController();