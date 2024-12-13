const TodoMongoRepository = require('./mongodb/TodoMongoRepository');
const TodoMariaRepository = require('./mariadb/TodoMariaRepository');

class TodoRepositoryFactory {
  static getRepository() {
    const dbType = process.env.DB_TYPE || 'mongodb';
    
    switch (dbType) {
      case 'mongodb':
        return new TodoMongoRepository();
      case 'mariadb':
        return new TodoMariaRepository();
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }
}

module.exports = TodoRepositoryFactory; 