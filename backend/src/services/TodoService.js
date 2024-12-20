const ServiceError = require('../utils/errors/ServiceError');
const constants = require('../constants/constants');

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

  async validateTeamExists(teamId) {
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw ServiceError.teamNotFound();
    }
    return team;
  }

  async createTodo(userId, todoData) {
    await this.validateUserExists(userId);
    if (todoData.teamId) {
      await this.validateTeamExists(todoData.teamId);
    }
    const todo = await this.todoRepository.create(todoData, userId);
    return this.todoRepository.formatTodoResponse(todo);
  }

  async getUserTodos(userId) {
    await this.validateUserExists(userId);
    return await this.todoRepository.findByUserId(userId);
  }

  async getTeamTodos(teamId) {
    await this.validateTeamExists(teamId);
    return await this.todoRepository.findByTeamId(teamId);
  }

  async getAllTeamTodos(teamId, userId) {
    await this.validateUserExists(userId);
    await this.validateTeamExists(teamId);
    const isMember = await this.teamRepository.isMember(teamId, userId);
    if (!isMember) {
      throw ServiceError.todoNotBelongToUser();
    }
    return await this.todoRepository.findByTeamId(teamId);
  }

  async getTodoByTodoId(todoId) {
    const todo = await this.validateTodoExists(todoId);
    return this.todoRepository.formatTodoResponse(todo);
  }

  async updateTodo(userId, todoId, updateData) {
    await this.validateUserExists(userId);
    const todo = await this.validateTodoExists(todoId);
    if (todo.teamId) {
      await this.validateTeamExists(todo.teamId);
      const isMember = await this.teamRepository.isMember(todo.teamId, userId);
      if (!isMember) {
        throw ServiceError.todoNotBelongToUser();
      }
    } else {
      console.log(todo.createdBy, userId);
      if (todo.createdBy !== userId) {
        throw ServiceError.todoNotBelongToUser();
      }
    }
    const updatedTodo = this._processUpdate(todo, updateData);
    return this.todoRepository.formatTodoResponse(updatedTodo);
  }

  async updateTodoStatus(todoId) {
    const todo = await this.validateTodoExists(todoId);
    const status = todo.status === constants.TODO_STATUS.DONE ? constants.TODO_STATUS.IN_PROGRESS : constants.TODO_STATUS.DONE;
    const updatedTodo = this._processUpdate(todo, { status })
    return this.todoRepository.formatTodoResponse(updatedTodo);
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
    if (newStatus === constants.TODO_STATUS.DONE) {
      if (!todo.completedAt) {
        updatedTodo.completedAt = new Date();
      }
    } else {
      updatedTodo.completedAt = null;
    }
    return await this.todoRepository.update(todo.id, updatedTodo);
  }

  async deleteTodo(userId, todoId) {
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

    return await this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
