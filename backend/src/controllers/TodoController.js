const { StatusCodes } = require('http-status-codes');
const TodoService = require('../services/TodoService');
const TodoRepositoryFactory = require('../models/TodoRepositoryFactory');
const todoRepository = TodoRepositoryFactory.createRepository();
const todoService = new TodoService(todoRepository);

class TodoController {
  async createTodo(req, res) {
    try {
      const todo = await todoService.createTodo(req.body);
      res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일을 생성하는 중 오류가 발생했습니다.', error: error.message });
    }
  }

  async getAllTodos(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일들을 조회하는 중 오류가 발생했습니다.', error: error.message });
    }
  } 

  async getTodoById(req, res) {
    try {
      const todo = await todoService.getTodoById(req.params.id);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일을 조회하는 중 오류가 발생했습니다.', error: error.message });
    }
  }

  async updateTodo(req, res) {
    try {
      const todo = await todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일을 업데이트하는 중 오류가 발생했습니다.', error: error.message });
    }
  }

  async updateTodoStatus(req, res) {
    try {
      const todo = await todoService.updateTodoStatus(req.params.id, req.body.status);
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일의 상태를 업데이트하는 중 오류가 발생했습니다.', error: error.message });
    }
  }

  async deleteTodo(req, res) {
    try {
      await todoService.deleteTodo(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: '할 일을 삭제하는 중 오류가 발생했습니다.', error: error.message });
    }
  }
}

module.exports = new TodoController();