const sequelize = require('../../config/mariadb');
const { TodoSchema } = require('../interfaces/TodoSchema');
const convertToSequelizeSchema = require('./utils/schemaConverter');

const convertedSchema = convertToSequelizeSchema(TodoSchema);
const Todo = sequelize.define(
  'Todo',  // 기본적으로 테이블 이름을 복수형으로 자동 변환 'todos'
  convertedSchema.attributes,{
    ...convertedSchema.options,
  }
  
);

module.exports = Todo; 