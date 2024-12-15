/**
 * Todo 모델의 공통 스키마 정의
 * @interface TodoSchema
 */
const TodoSchema = {
  title: {
    type: 'string',
    required: true,
    trim: true
  },
  status: {
    type: 'string',
    values: ['진행중', '완료'],
    default: '진행중'
  },
  timestamps: true
};

module.exports = TodoSchema; 