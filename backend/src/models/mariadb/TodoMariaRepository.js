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

  formatTodo(todoData) {
    return {
      id: todoData.id,
      title: todoData.title,
      status: todoData.status,
      content: todoData.content,
      createdAt: todoData.createdAt,
      createdBy: todoData.createdBy,
      updatedAt: todoData.updatedAt,
      completedAt: todoData.completedAt,
      teamId: todoData.teamId
    };
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

  async create(todoData, userId) {
    todoData.createdBy = userId;
    const todo = await this.Todo.create(todoData);
    return this.formatTodo(todo);
  }

  async findById(todoId) {
    const todo = await this.Todo.findByPk(todoId);
    return todo ? this.formatTodo(todo) : null;
  }

  async findByUserId(userId) {
    const todos = await this.Todo.findAll({
      where: { createdBy: userId, teamId: null },
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodo(todo));
  }

  async findByTeamId(teamId) {
    const todos = await this.Todo.findAll({
      where: { teamId: teamId },
      order: [['createdAt', 'DESC']]
    });
    return todos.map(todo => this.formatTodo(todo));
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