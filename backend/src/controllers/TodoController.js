const { StatusCodes } = require('http-status-codes');
const { body, param } = require('express-validator');
const TodoService = require('../services/TodoService');
const { TodoRepositoryFactory } = require('../models/RepositoryFactory');
const { VALIDATION_ERROR_MESSAGES } = require('../constants/messages');
const { TODO_STATUS } = require('../models/interfaces/TodoSchema');
const validateRequest = require('../middleware/validateRequest');

class TodoController {
  static todoService = new TodoService(TodoRepositoryFactory.createRepository());

  static validateTodo = [
    body('title')
      .isString()
      .notEmpty()
      .trim()
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_REQUIRED)
      .isLength({ max: 255 })
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.TITLE_TOO_LONG),
    body('content')
      .optional()
      .isString()
      .trim()
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.CONTENT_INVALID),
    body('status')
      .optional()
      .isIn(Object.values(TODO_STATUS))
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
    validateRequest
  ];

  static validateTodoStatus = [
    body('status')
      .notEmpty()
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_REQUIRED)
      .isIn(Object.values(TODO_STATUS))
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.STATUS_INVALID),
    validateRequest
  ];

  static validateTodoId = [
    param('id')
      .isInt()
      .withMessage(VALIDATION_ERROR_MESSAGES.TODO.ID_INVALID),
    validateRequest
  ];

  static createTodo = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.createTodo(req.body);
      res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
      next(error);
    }
  }

  static getAllUserTodos = async (req, res, next) => {
    try {
      const todos = await TodoController.todoService.getAllUserTodos(req.user.id);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  static getTodoById = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.getTodoByTodoId(req.params.id);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  static updateTodo = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  static updateTodoStatus = async (req, res, next) => {
    try {
      const todo = await TodoController.todoService.updateTodoStatus(req.params.id, req.body.status);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  static deleteTodo = async (req, res, next) => {
    try {
      await TodoController.todoService.deleteTodo(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;