const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mariadb');
const TodoSchema = require('../interfaces/TodoSchema');

// Sequelize 스키마 변환 함수
const convertToSequelizeSchema = (schema) => {
  const sequelizeSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;

    if (value.type === String) {
      sequelizeSchema[key] = {
        type: DataTypes.STRING,
        allowNull: !value.required
      };
    } else if (value.enum) {
      sequelizeSchema[key] = {
        type: DataTypes.ENUM(...value.enum),
        defaultValue: value.default,
        allowNull: !value.required
      };
    }
  });

  // Sequelize 필수 필드 추가
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
    timestamps: TodoSchema.timestamps
  }
);

module.exports = Todo; 