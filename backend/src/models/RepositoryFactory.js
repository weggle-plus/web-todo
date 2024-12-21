const { config } = require('../config/database');
const TodoMariaRepository = require('./mariadb/TodoMariaRepository');


class BaseRepositoryFactory {
  static createRepository(mariaRepo) {
    switch(config.type) {
      // case 'mongodb':
      //   return new mongoRepo();
      case 'mariadb':
        return new mariaRepo();
      default:
        throw new Error(`지원하지 않는 데이터베이스 타입입니다: ${config.type}`);
    }
  }
}

class TodoRepositoryFactory extends BaseRepositoryFactory {
  static createRepository() {
    return super.createRepository(TodoMariaRepository);
  }
}


module.exports = {
  TodoRepositoryFactory
};