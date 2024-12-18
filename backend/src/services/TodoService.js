const { TODO_STATUS } = require('../models/interfaces/TodoSchema');
const ValidationError = require('../utils/errors/ValidationError');


class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  validateStatus(status) {
    if (status && !Object.values(TODO_STATUS).includes(status)) {
      throw ValidationError.todoStatusInvalid();
    }
  }

  async validateTodoExists(id) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw ValidationError.todoNotFound();
    }
    return todo;
  }

  async createTodo(todoData) {
    if (todoData.status) {
      this.validateStatus(todoData.status);
    }
    return await this.todoRepository.create(todoData);
  }

  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  async getTodoById(id) {
    return await this.validateTodoExists(id);
  }

  async updateTodo(id, updateData) {
    const todo = await this.validateTodoExists(id);
    if (updateData.status) {
      this.validateStatus(updateData.status);
    }
    return this._processUpdate(todo, updateData);
  }

  async updateTodoStatus(id) {
    const todo = await this.validateTodoExists(id);
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

  async deleteTodo(id) {
    await this.validateTodoExists(id);
    return await this.todoRepository.delete(id);
  }
}

module.exports = TodoService;
