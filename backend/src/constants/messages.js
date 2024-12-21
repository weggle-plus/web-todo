const constants = require('./constants');

// 유효성 검사 관련 에러 메시지
const VALIDATION_ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "할 일의 제목은 필수이며 문자열이어야 합니다",
    TITLE_TOO_LONG: `할 일 제목은 ${constants.TODO_TITLE_MAX_LENGTH}자를 초과할 수 없습니다.`,
    CONTENT_INVALID: "할 일 내용은 문자열이어야 합니다.",
    STATUS_REQUIRED: "상태값은 필수입니다.",
    STATUS_INVALID: "잘못된 상태값입니다. \"in-progress\" 또는 \"done\"만 가능합니다",
  }
};

// 서비스 로직 관련 에러 메시지
const SERVICE_ERROR_MESSAGES = {
  TODO: {
    NOT_FOUND: '할 일을 찾을 수 없습니다.',
  }
};



// 데이터베이스 관련 에러 메시지
const DATABASE_ERROR_MESSAGES = {
  TODO: {
    UPDATE_FAILED: '할 일 업데이트에 실패했습니다.',
    DELETE_FAILED: '할 일 삭제에 실패했습니다.',
  }
};

module.exports = {
  VALIDATION_ERROR_MESSAGES,
  SERVICE_ERROR_MESSAGES,
  DATABASE_ERROR_MESSAGES
};