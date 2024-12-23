const sequelize = require("../../config/mariadb");
const { TodoSchema } = require("../interfaces/TodoSchema");
const convertToSequelizeSchema = require("./utils/schemaConverter");

const convertedSchema = convertToSequelizeSchema(TodoSchema);
const Todo = sequelize.define(
  "Todo",
  convertedSchema.attributes,
  convertedSchema.options
);

module.exports = Todo;
