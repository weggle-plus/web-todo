const sequelize = require('../../config/mariadb');
const { TodoSchema } = require('../interfaces/TodoSchema');
const { convertToSequelizeSchema } = require('./utils/schemaConverter');

const Todo = sequelize.define(
  'Todo',  // 기본적으로 테이블 이름을 복수형으로 자동 변환 'todos'
  convertToSequelizeSchema(TodoSchema)
);

module.exports = Todo; 