require('dotenv').config();

module.exports = {
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/todo-app'
  },
  mariadb: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'todo_app'
  }
}; 