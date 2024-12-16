const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mariadb');
const { TodoSchema } = require('../interfaces/TodoSchema');

const convertToSequelizeSchema = (schema) => {
  const sequelizeSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;

    sequelizeSchema[key] = {
      allowNull: !value.required,
      defaultValue: value.default
    };

    switch (key) {
      case 'integer':
        sequelizeSchema[key].type = DataTypes.INTEGER;
        break;
      case 'string':
        sequelizeSchema[key].type = DataTypes.STRING;
        break;
      case 'text':
        sequelizeSchema[key].type = DataTypes.TEXT;
        break;
      case 'date':
        sequelizeSchema[key].type = DataTypes.DATE;
        break;
      case 'enum':
        sequelizeSchema[key].type = DataTypes.ENUM;
        sequelizeSchema[key].values = value.enum;
        break;
    }
    
    if (value.primaryKey) {
      sequelizeSchema[key].primaryKey = true;
    }

    if (value.autoIncrement) {
      sequelizeSchema[key].autoIncrement = true;
    }
  });

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