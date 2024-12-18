const { TODO_STATUS } = require('../models/interfaces/TodoSchema');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }

  static titleRequired() {
    return new ValidationError("할 일의 제목은 필수입니다");
  }

  static statusInvalid() {
    return new ValidationError(
      `잘못된 상태값입니다. "${TODO_STATUS.IN_PROGRESS}" 또는 "${TODO_STATUS.DONE}"만 가능합니다`
    );
  }

  static todoNotFound() {
    return new ValidationError("해당 할 일을 찾을 수 없습니다");
  }
}

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  validateStatus(status) {
    if (status && !Object.values(TODO_STATUS).includes(status)) {
      throw ValidationError.statusInvalid();
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
    if (!todoData.title) {
      throw new ValidationError.titleRequired();
    }
    this.validateStatus(todoData.status);
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
    this.validateStatus(updateData.status);
    
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
