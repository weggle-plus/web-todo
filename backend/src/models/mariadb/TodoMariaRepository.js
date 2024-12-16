const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMaria');

class TodoMariaRepository extends TodoRepository {
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
    const todo = await Todo.create(todoData);
    return this.formatTodoResponse(todo);
  }

  async findAll() {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodoResponse(todo));
  }

  async findById(id) {
    const todo = await Todo.findByPk(id);
    return todo ? this.formatTodoResponse(todo) : null;
  }

  async update(id, todoData) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    await todo.update(todoData);
    return this.formatTodoResponse(todo);
  }

  async delete(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    await todo.destroy();
    return this.formatTodoResponse(todo);
  }
}

module.exports = TodoMariaRepository; 