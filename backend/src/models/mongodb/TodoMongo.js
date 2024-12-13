const mongoose = require('mongoose');
const TodoSchema = require('../interfaces/TodoSchema');

// MongoDB 스키마 변환 함수
const convertToMongoSchema = (schema) => {
  const mongoSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') {
      // timestamps는 mongoose 옵션으로 처리
      return;
    }
    
    if (key === 'type' && value === String) {
      mongoSchema[key] = String;
    } else {
      mongoSchema[key] = value;
    }
  });

  return mongoSchema;
};

const mongoSchema = new mongoose.Schema(
  convertToMongoSchema(TodoSchema),
  { timestamps: TodoSchema.timestamps }
);

module.exports = mongoose.model('Todo', mongoSchema); 