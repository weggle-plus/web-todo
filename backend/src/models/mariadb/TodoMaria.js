const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mariadb');
const TodoSchema = require('../interfaces/TodoSchema');

const convertToSequelizeSchema = (schema) => {
  const sequelizeSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;

    if (value.type.toLowerCase() === 'string') {
      sequelizeSchema[key] = {
        type: value.values ? DataTypes.ENUM(...value.values) : DataTypes.STRING,
        allowNull: !value.required,
        defaultValue: value.default
      };
    }
  });

  sequelizeSchema.id = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  };

  return sequelizeSchema;
};

const Todo = sequelize.define(
  'Todo',
  convertToSequelizeSchema(TodoSchema),
  {
    tableName: 'todos',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  }
);

module.exports = Todo; 