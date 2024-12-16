const TODO_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
};

const TodoSchema = {
  id: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: 'string',
    required: true,
    trim: true
  },
  status: {
    type: 'enum',
    enum: Object.values(TODO_STATUS),
    default: TODO_STATUS.IN_PROGRESS
  },
  // TODO: priority
  // TODO: category
  content: {
    type: 'text',
    required: false,
    trim: true
  },
  // TODO: due_date
  createdAt: {
    type: 'date',
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: 'date',
    required: true,
    default: Date.now
  },
  completedAt: {  
    type: 'date',
    required: false  // 할 일 상태가 "done"인 경우에만 존재
  },
  // TODO: is_deleted
};

module.exports = {
  TodoSchema,
  TODO_STATUS
}; 