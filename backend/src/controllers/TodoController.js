const { StatusCodes } = require("http-status-codes");
const TodoService = require("../services/TodoService");
const {
  TodoRepositoryFactory,
  UserRepositoryFactory,
  TeamRepositoryFactory,
} = require("../models/RepositoryFactory");

class TodoController {
  static todoService = new TodoService(
    TodoRepositoryFactory.createRepository(),
    UserRepositoryFactory.createRepository(),
    TeamRepositoryFactory.createRepository()
  );

  static createTodo = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.createTodo(
        req.user.id,
        req.body
      );
      res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static getUserTodos = async (req, res, next) => {
    try {
      const todos = await TodoController.todoService.getUserTodos(req.user.id);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  };

  static updateTodo = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.updateTodo(
        req.user.id,
        req.params.id,
        req.body
      );
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  static getTeamTodos = async (req, res, next) => {
    try {
      const todos = await TodoController.todoService.getTeamTodos(
        req.params.teamId
      );
      res.json(todos);
    } catch (error) {
      next(error);
    }
  };

  static createTeamTodo = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.createTeamTodo(
        req.params.teamId,
        req.body
      );
      res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static updateTodoStatus = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.updateTodoStatus(
        req.user.id,
        req.params.id
      );
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  static deleteTodo = async (req, res, next) => {
    try {
      await TodoController.todoService.deleteTodo(req.user.id, req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TodoController;
