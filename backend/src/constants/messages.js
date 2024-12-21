const constants = require('./constants');

// 유효성 검사 관련 에러 메시지
const VALIDATION_ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "할 일의 제목은 필수이며 문자열이어야 합니다",
    TITLE_TOO_LONG: `할 일 제목은 ${constants.TODO_TITLE_MAX_LENGTH}자를 초과할 수 없습니다.`,
    CONTENT_INVALID: "할 일 내용은 문자열이어야 합니다.",
    STATUS_REQUIRED: "상태값은 필수입니다.",
    STATUS_INVALID: "잘못된 상태값입니다. \"in-progress\" 또는 \"done\"만 가능합니다",
  },
  USER: {
    PASSWORD_REQUIRED: "비밀번호를 입력해주세요.",
    PASSWORD_LENGTH: `비밀번호는 ${constants.PASSWORD_MIN_LENGTH}자 이상 ${constants.PASSWORD_MAX_LENGTH}자 이하여야 합니다.`,
    PASSWORD_PATTERN: "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.",
    USERNAME_LENGTH: `사용자 이름은 ${constants.USERNAME_MIN_LENGTH}자 이상 ${constants.USERNAME_MAX_LENGTH}자 이하여야 합니다.`
  }
};

// 서비스 로직 관련 에러 메시지
const SERVICE_ERROR_MESSAGES = {
  TODO: {
    NOT_FOUND: '할 일을 찾을 수 없습니다.',
    NOT_BELONG_TO_USER: '해당 할 일에 대한 권한이 없습니다.',
  },
  USER: {
    NOT_FOUND: '사용자를 찾을 수 없습니다.',
    USERNAME_ALREADY_EXISTS: '이미 등록된 사용자 이름입니다.',
  }
};

// 인증 관련 에러 메시지
const AUTH_ERROR_MESSAGES = {
  UNAUTHORIZED: '인증이 필요합니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  FORBIDDEN: '권한이 없습니다.',
  INVALID_USERNAME_OR_PASSWORD: '사용자 이름 또는 비밀번호가 올바르지 않습니다.',
  RESTRICT_INVITE_TO_MEMBERS: '초대는 팀원만 가능합니다.'
};

// 데이터베이스 관련 에러 메시지
const DATABASE_ERROR_MESSAGES = {
  TODO: {
    UPDATE_FAILED: '할 일 업데이트에 실패했습니다.',
    DELETE_FAILED: '할 일 삭제에 실패했습니다.',
  },
  USER: {
    UPDATE_FAILED: '사용자 업데이트에 실패했습니다.',
    DELETE_FAILED: '사용자 삭제에 실패했습니다.',
  }
};

module.exports = {
  VALIDATION_ERROR_MESSAGES,
  SERVICE_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES,
  DATABASE_ERROR_MESSAGES
};
