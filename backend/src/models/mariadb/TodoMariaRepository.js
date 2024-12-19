const TodoRepository = require('../interfaces/TodoRepository');
const Todo = require('./TodoMaria');
const User = require('./UserMaria');
const { Team, UserTeam } = require('./TeamMaria');


class TodoMariaRepository extends TodoRepository {
  constructor(TodoModel = Todo, UserModel = User, TeamModel = Team, UserTeamModel = UserTeam) {
    super();
    this.Todo = TodoModel;
    this.User = UserModel;
    this.Team = TeamModel;
    this.UserTeam = UserTeamModel;
  }

  formatTodoResponse(todo) {
    return {
      id: todo.id,
      title: todo.title,
      status: todo.status,
      content: todo.content,
      createdAt: todo.createdAt,
      createdBy: todo.createdBy,
      updatedAt: todo.updatedAt,
      updatedBy: todo.updatedBy,
      completedAt: todo.completedAt,
      teamId: todo.teamId
    };
  }

  async create(todoData, userId) {
    todoData.createdBy = userId;
    const todo = await this.Todo.create(todoData);
    return this.formatTodoResponse(todo);
  }

  async findById(todoId) {
    console.log(todoId);
    const todo = await this.Todo.findByPk(todoId);
    return todo ? this.formatTodoResponse(todo) : null;
  }

  async findByUserId(userId) {
    const todos = await this.Todo.findAll({
      where: { createdBy: userId, teamId: null },
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodoResponse(todo));
  }

  async findByTeamId(teamId) {
    const todos = await this.Todo.findAll({
      where: { teamId: teamId },
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodoResponse(todo));
  }

  async update(todoId, todoData) {
    await this.Todo.update(todoData, { 
      where: { id: todoId } 
    });
    return await this.findById(todoId);
  }

  async delete(todoId) {
    const result = await this.Todo.destroy({ where: { id: todoId } });
    return result === 1;
  }


}

module.exports = TodoMariaRepository; 