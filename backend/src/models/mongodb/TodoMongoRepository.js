const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMongo');

class TodoMongoRepository extends TodoRepository {
  async create(todoData) {
    const todo = new Todo(todoData);
    return await todo.save();
  }

  async findAll() {
    return await Todo.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Todo.findById(id);
  }

  async update(id, todoData) {
    return await Todo.findByIdAndUpdate(
      id,
      { ...todoData, updatedAt: Date.now() },
      { new: true }
    );
  }

  async updateStatus(id, status) {
    return await Todo.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
  }

  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = TodoMongoRepository; 