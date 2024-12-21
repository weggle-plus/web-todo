const constants = require('../constants/constants');

class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTodo(todo) {
    return this.todoRepository.create(todo);
  }

  async getTodos() {
    return this.todoRepository.findAll();
  }

  async updateTodo(todoId, updateData) {
    const todo = await this.todoRepository.findById(todoId);
    const updatedTodo = this._processUpdate(todo, updateData);

    return updatedTodo;
  }

  async updateTodoStatus(todoId) {
    const todo = await this.todoRepository.findById(todoId);
    const status = todo.status === constants.TODO_STATUS.DONE ? constants.TODO_STATUS.IN_PROGRESS : constants.TODO_STATUS.DONE;
    const updatedTodo = this._processUpdate(todo, { status })

    return updatedTodo;
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

  async deleteTodo(todoId) {
    return await this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
