const constants = require("../../constants/constants");

const TodoSchema = {
  id: {
    type: "integer",
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  status: {
    type: "enum",
    values: Object.values(constants.TODO_STATUS),
    default: constants.TODO_STATUS.IN_PROGRESS,
  },
  // TODO: priority
  // TODO: category
  content: {
    type: "text",
    required: false,
    trim: true,
  },
  // TODO: due_date
  createdAt: {
    type: "timestamp",
    required: true,
    default: "CURRENT_TIMESTAMP",
  },
  createdBy: {
    type: "integer",
    required: true,
    references: "users.id",
  },
  updatedAt: {
    type: "timestamp",
    required: false,
    default: "CURRENT_TIMESTAMP",
  },
  updatedBy: {
    type: "integer",
    required: false,
    references: "users.id",
  },
  completedAt: {
    type: "timestamp",
    required: false, // 할 일 상태가 "done"인 경우에만 존재
  },
  teamId: {
    type: "integer",
    required: false,
    references: "teams.id",
    default: null,
  },
  // TODO: is_deleted

  __options: {
    underscored: true,
    indexes: [
      {
        name: "idx_todo_created_at", // 생성일 기준 검색을 위한 인덱스
        fields: ["created_at"],
      },
      {
        name: "idx_todo_team_id", // 팀 투두 검색을 위한 인덱스
        fields: ["team_id"],
      },
      {
        name: "idx_todo_user_id_and_team_id", // 사용자 투두 검색을 위한 인덱스
        fields: ["created_by", "team_id"],
      },
    ],
  },
};

module.exports = {
  TodoSchema,
};
