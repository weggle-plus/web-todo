const mongoose = require('mongoose');
const { TodoSchema } = require('../interfaces/TodoSchema');

// MongoDB 스키마 변환 함수
const convertToMongoSchema = (schema) => {
  const mongoSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;
    
    mongoSchema[key] = {};

    // 타입 변환
    switch (value.type) {
      case 'integer':
        mongoSchema[key].type = Number;
        break;
      case 'string':
        mongoSchema[key].type = String;
        break;
      case 'text':
        mongoSchema[key].type = String;
        break;
      case 'date':
        mongoSchema[key].type = Date;
        break;
      case 'enum':
        mongoSchema[key].type = String;
        mongoSchema[key].enum = value.enum;
        break;
      default:
        throw new Error(`지원하지 않는 타입: ${value.type}`);
    }

    // 공통 속성 변환
    if (value.required) mongoSchema[key].required = true;
    if (value.default) mongoSchema[key].default = value.default;
    if (value.trim) mongoSchema[key].trim = true;
  });

  return mongoSchema;
};

const mongoSchema = new mongoose.Schema(
  convertToMongoSchema(TodoSchema),
  { timestamps: true }
);

module.exports = mongoose.model('Todo', mongoSchema); 