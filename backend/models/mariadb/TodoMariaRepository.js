const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./Todo');

class TodoMariaRepository extends TodoRepository {
  async create(todoData) {
    return await Todo.create(todoData);
  }

  async findAll() {
    return await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    return await Todo.findByPk(id);
  }

  async update(id, todoData) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    return await todo.update({
      ...todoData,
      updatedAt: new Date()
    });
  }

  async updateStatus(id, status) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    return await todo.update({
      status,
      updatedAt: new Date()
    });
  }

  async delete(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) return null;
    await todo.destroy();
    return todo;
  }
}

module.exports = TodoMariaRepository; 