const { TODO_STATUS } = require('../models/interfaces/TodoSchema');
const ServiceError = require('../utils/errors/ServiceError');


class TodoService {
  constructor(todoRepository, userRepository, teamRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
    this.teamRepository = teamRepository;
  }

  async validateTodoExists(todoId) {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw ServiceError.todoNotFound();
    }
    return todo;
  }

  async validateUserExists(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  async createTodo(userId, todoData) {
    await this.validateUserExists(userId);
    if (todoData.teamId) {
      const team = await this.teamRepository.findById(todoData.teamId);
      if (!team) {
        throw ServiceError.teamNotFound();
      }
    }
    return await this.todoRepository.create(todoData, userId);
  }

  async getUserTodos(userId) {
    return await this.todoRepository.findByUserId(userId);
  }

  async getTeamTodos(teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    return await this.todoRepository.findByTeamId(teamId);
  }

  async getAllTeamTodos(teamId, userId) {
    const isMember = await this.teamRepository.isMember(teamId, userId);
    if (!isMember) {
      throw ServiceError.todoNotBelongToUser();
    }
    return await this.todoRepository.findByTeamId(teamId);
  }

  async getTodoByTodoId(todoId) {
    return await this.validateTodoExists(todoId);
  }

  async updateTodo(userId, todoId, updateData) {
    const todo = await this.validateTodoExists(todoId);
    if (todo.teamId) {
      const isMember = await this.teamRepository.isMember(todo.teamId, userId);
      if (!isMember) {
        throw ServiceError.todoNotBelongToUser();
      }
    } else {
      if (todo.createdBy !== userId) {
        throw ServiceError.todoNotBelongToUser();
      }
    }
    return this._processUpdate(todo, updateData);
  }

  async updateTodoStatus(todoId) {
    const todo = await this.validateTodoExists(todoId);
    const status = todo.status === TODO_STATUS.DONE ? TODO_STATUS.IN_PROGRESS : TODO_STATUS.DONE;
    
    return this._processUpdate(todo, { status });
  }

  async _processUpdate(todo, updates) {
    const hasChanges = Object.keys(updates).some(key => 
      updates[key] !== todo[key]
    );

    if (!hasChanges) {
      return todo;
    }

    const updatedTodo = {
      ...todo,
      ...updates,
      updatedAt: new Date()
    };

    const newStatus = updates.status || todo.status;
    if (newStatus === TODO_STATUS.DONE) {
      if (!todo.completedAt) {
        updatedTodo.completedAt = new Date();
      }
    } else {
      updatedTodo.completedAt = null;
    }
    return await this.todoRepository.update(todo.id, updatedTodo);
  }

  async deleteTodo(userId, todoId) {
    await this.validateTodoExists(todoId);
    return await this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
