const sequelize = require('../../config/mariadb');
const { TodoSchema } = require('../interfaces/TodoSchema');
const { convertToSequelizeSchema } = require('./utils/schemaConverter');

const Todo = sequelize.define(
  'Todo',
  convertToSequelizeSchema(TodoSchema)
);

module.exports = Todo; 