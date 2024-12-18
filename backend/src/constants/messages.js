const VALIDATION_ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "할 일의 제목은 필수이며 문자열이어야 합니다",
    TITLE_TOO_LONG: "할 일 제목은 255자를 초과할 수 없습니다.",
    CONTENT_INVALID: "할 일 내용은 문자열이어야 합니다.",
    STATUS_REQUIRED: "상태값은 필수입니다.",
    STATUS_INVALID: "잘못된 상태값입니다. \"in-progress\" 또는 \"done\"만 가능합니다",
  },
  USER: {
    EMAIL_INVALID: "유효한 이메일 주소를 입력해주세요.",
    PASSWORD_REQUIRED: "비밀번호를 입력해주세요.",
    PASSWORD_LENGTH: "비밀번호는 8자 이상 64자 이하여야 합니다.",
    PASSWORD_PATTERN: "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.",
    USERNAME_LENGTH: "사용자 이름은 2자 이상 30자 이하여야 합니다."
  },
  TEAM: {
    NAME_REQUIRED: "팀 이름은 필수입니다.",
    NAME_LENGTH: "팀 이름은 2자 이상 50자 이하여야 합니다.",
    DESCRIPTION_INVALID: "팀 설명은 문자열이어야 합니다.",
    ID_INVALID: "유효하지 않은 팀 ID입니다.",
    MEMBER_ID_INVALID: "유효하지 않은 사용자 ID입니다.",
    MEMBER_ROLE_INVALID: "유효하지 않은 팀원 역할입니다."
  }
}

const SERVICE_ERROR_MESSAGES = {
  TODO: {
    NOT_FOUND: '할 일을 찾을 수 없습니다.',
    AUTH_REQUIRED: '인증이 필요합니다.',
  },
  USER: {
    NOT_FOUND: '사용자를 찾을 수 없습니다.',
    EMAIL_ALREADY_EXISTS: '이미 등록된 이메일입니다.',
    INVALID_EMAIL_OR_PASSWORD: '이메일 또는 비밀번호가 올바르지 않습니다.',
    TODO_NOT_BELONG_TO_USER: '할 일이 사용자에게 속하지 않습니다.'
  },
  TEAM: {
    NOT_FOUND: '팀을 찾을 수 없습니다.',
    NAME_ALREADY_EXISTS: '이미 존재하는 팀 이름입니다.',
    INVITATION_NOT_FOUND: '초대를 찾을 수 없습니다.',
    MEMBER_ALREADY_EXISTS: '이미 팀에 존재하는 멤버입니다.',
    INVITATION_ALREADY_EXISTS: '이미 초대가 존재합니다.',
    INVALID_ROLE: '유효하지 않은 팀 역할입니다.'
  }
}

const AUTH_ERROR_MESSAGES = {
  UNAUTHORIZED: '인증이 필요합니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  FORBIDDEN: '권한이 없습니다.'
}


module.exports = {
  VALIDATION_ERROR_MESSAGES,
  SERVICE_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES
};
