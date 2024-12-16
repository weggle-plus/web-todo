const { config } = require('../config/database');
const TodoMongoRepository = require('./mongodb/TodoMongoRepository');
const TodoMariaRepository = require('./mariadb/TodoMariaRepository');

class TodoRepositoryFactory {
  static createRepository() {
    const type = config.type;
    
    switch(type) {
      case 'mongodb':
        return new TodoMongoRepository();
      case 'mariadb':
        return new TodoMariaRepository();
      default:
        throw new Error(`지원하지 않는 데이터베이스 타입입니다: ${type}`);
    }
  }
}

module.exports = TodoRepositoryFactory;