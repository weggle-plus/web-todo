const mongoose = require('mongoose');
const { TodoSchema } = require('../interfaces/TodoSchema');

// MongoDB 스키마 변환 함수
const convertToMongoSchema = (schema) => {
  const mongoSchema = {};
  
  Object.entries(schema).forEach(([key, value]) => {
    if (key === 'timestamps') return;
    mongoSchema[key] = value;
  });

  return mongoSchema;
};

const mongoSchema = new mongoose.Schema(
  convertToMongoSchema(TodoSchema),
  { timestamps: true }
);

module.exports = mongoose.model('Todo', mongoSchema); 