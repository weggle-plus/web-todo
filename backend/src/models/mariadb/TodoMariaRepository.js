const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMaria');

class TodoMariaRepository extends TodoRepository {
  constructor(TodoModel = Todo) {
    super();
    this.Todo = TodoModel;
  }

  formatTodoResponse(todoData) {
    return {
      id: todoData.id,
      title: todoData.title,
      status: todoData.status,
      content: todoData.content,
      createdAt: todoData.createdAt,
      updatedAt: todoData.updatedAt,
      completedAt: todoData.completedAt
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
      throw new Error('Todo not found');
    }

    const updatedTodo = await todo.update(todoData);
    const updatedTodoResponse = this.formatTodoResponse(updatedTodo);
    return updatedTodoResponse;
  }

  async delete(id) {
    const todo = await this.Todo.findByPk(id);
    await todo.destroy();
    return todo;
  }
}

module.exports = TodoMariaRepository; 