const { DataTypes } = require('sequelize');

const convertToSequelizeSchema = (schema) => {
  if (typeof schema !== 'object' || schema === null) {
    throw new Error('스키마가 올바르지 않습니다.');
  }

  const sequelizeSchema = {};

  Object.entries(schema).forEach(([key, value]) => {
    if (!value || typeof value !== 'object') {
      throw new Error(`필드 "${key}"의 정의가 올바르지 않습니다. 객체가 필요합니다.`);
    }

    sequelizeSchema[key] = {}; 

    switch (value.type) {
      case 'integer':
        sequelizeSchema[key].type = DataTypes.INTEGER;
        break;
      case 'string':
        sequelizeSchema[key].type = DataTypes.STRING;
        break;
      case 'text':
        sequelizeSchema[key].type = DataTypes.TEXT;
        break;
      case 'boolean':
        sequelizeSchema[key].type = DataTypes.BOOLEAN;
        break;
      case 'date':
        sequelizeSchema[key].type = DataTypes.DATE;
        break;
      case 'enum':
        if (!Array.isArray(value.enum)) {
          throw new Error(`필드 "${key}"의 열거형 정의가 올바르지 않습니다. 배열이 필요합니다.`);
        }
        sequelizeSchema[key].type = DataTypes.ENUM;
        sequelizeSchema[key].values = value.enum;
        break;
      default:
        throw new Error(`지원하지 않는 타입 "${value.type}"이 필드 "${key}"에 사용되었습니다.`);
    }

    if (value.primaryKey) {
      sequelizeSchema[key].primaryKey = true;
    }

    if (value.autoIncrement) {
      sequelizeSchema[key].autoIncrement = true;
    }

    if (value.unique) {
      sequelizeSchema[key].unique = true;
    }

    if (value.required) {
      sequelizeSchema[key].allowNull = false;
    } else {
      sequelizeSchema[key].allowNull = true;
    }

    if (value.default !== undefined) {
      sequelizeSchema[key].defaultValue = value.default;
    }
  });

  return sequelizeSchema;
};

module.exports = {
  convertToSequelizeSchema
}; 