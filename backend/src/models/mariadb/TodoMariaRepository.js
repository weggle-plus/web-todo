const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMaria');

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
    return await this.Todo.create(todoData);
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
    if (!todo) return null;
    return await todo.update(todoData);
  }

  async delete(id) {
    const todo = await this.Todo.findByPk(id);
    if (!todo) return null;
    await todo.destroy();
    return todo;
  }
}

module.exports = TodoMariaRepository; 