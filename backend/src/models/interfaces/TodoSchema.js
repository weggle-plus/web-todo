/**
 * Todo 모델의 공통 스키마 정의
 * @interface TodoSchema
 */

const TODO_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
};

const TodoSchema = {
  id: {
    type: Number,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: Object.values(TODO_STATUS),
    default: TODO_STATUS.IN_PROGRESS
  },
  // TODO: priority
  // TODO: category
  content: {
    type: String,
    required: false,
    trim: true
  },
  // TODO: due_date
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  completedAt: {
    type: Date,
    required: false
  },
  // TODO: is_deleted
};

module.exports = {
  TodoSchema,
  TODO_STATUS
}; 