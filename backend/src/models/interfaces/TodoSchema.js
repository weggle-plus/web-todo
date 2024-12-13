/**
 * Todo 모델의 공통 스키마 정의
 * @interface TodoSchema
 */
const TodoSchema = {
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['진행중', '완료'],
    default: '진행중'
  },
  timestamps: true  // createdAt, updatedAt 자동 관리
};

module.exports = TodoSchema; 