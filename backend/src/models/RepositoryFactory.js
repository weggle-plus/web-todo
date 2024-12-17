const { config } = require('../config/database');
const TodoMariaRepository = require('./mariadb/TodoMariaRepository');
const UserMariaRepository = require('./mariadb/UserMariaRepository');
const TeamMariaRepository = require('./mariadb/TeamMariaRepository');

class BaseRepositoryFactory {
  static createRepository(mongoRepo, mariaRepo) {
    switch(config.type) {
      case 'mongodb':
        return new mongoRepo();
      case 'mariadb':
        return new mariaRepo();
      default:
        throw new Error(`지원하지 않는 데이터베이스 타입입니다: ${config.type}`);
    }
  }
}

class TodoRepositoryFactory extends BaseRepositoryFactory {
  static createRepository() {
    return super.createRepository(TodoMongoRepository, TodoMariaRepository);
  }
}

class UserRepositoryFactory extends BaseRepositoryFactory {
  static createRepository() {
    return super.createRepository(UserMongoRepository, UserMariaRepository);
  }
}

class TeamRepositoryFactory extends BaseRepositoryFactory {
  static createRepository() {
    return super.createRepository(TeamMongoRepository, TeamMariaRepository);
  }
}

module.exports = {
  TodoRepositoryFactory,
  UserRepositoryFactory,
  TeamRepositoryFactory
};