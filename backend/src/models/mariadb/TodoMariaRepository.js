const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMaria');
const ValidationError = require('../../utils/errors/ValidationError');

class TodoMariaRepository extends TodoRepository {
  constructor(TodoModel = Todo) {
    super();
    this.Todo = TodoModel;
  }

  formatTodoResponse(todo) {
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      content: todo.content,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      completedAt: todo.completedAt
    };
  }

  async create(todoData) {
    const todo = await this.Todo.create(todoData);
    return this.formatTodoResponse(todo);
  }

  async findAll() {
    const todos = await this.Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodoResponse(todo));
  }

  async findById(id) {
    return await this.Todo.findByPk(id);
  }

  async update(id, todoData) {
    const todo = await this.Todo.findByPk(id);
    if (!todo) {
      throw ValidationError.todoNotFound();
    }
    return await todo.update(todoData);
  }

  async delete(id) {
    const todo = await this.Todo.findByPk(id);
    if (!todo) {
      throw ValidationError.todoNotFound();
    }
    await todo.destroy();
    return todo;
  }
}

module.exports = TodoMariaRepository; 