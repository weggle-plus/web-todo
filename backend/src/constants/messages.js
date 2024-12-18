const VALIDATION_ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "할 일의 제목은 필수입니다",
    STATUS_INVALID: "잘못된 상태값입니다. \"in-progress\" 또는 \"done\"만 가능합니다",
    NOT_FOUND: "해당 할 일을 찾을 수 없습니다",
  },
  USER: {
    EMAIL_ALREADY_EXISTS: "이미 등록된 이메일입니다.",
    INVALID_EMAIL_OR_PASSWORD: "이메일 또는 비밀번호가 올바르지 않습니다.",
    INACTIVE_ACCOUNT: "비활성화된 계정입니다.",
    NOT_FOUND: "사용자를 찾을 수 없습니다."
  },
  TEAM: {
    NOT_FOUND: "팀을 찾을 수 없습니다.",
    NAME_ALREADY_EXISTS: "이미 존재하는 팀 이름입니다.",
    MEMBER_ALREADY_EXISTS: "이미 존재하는 멤버입니다.",
    MEMBER_ROLE_INVALID: "유효하지 않은 역할입니다."
  }
}

const ERROR_MESSAGES = {
  TODO: {
    CREATE: '할 일 생성 중 오류가 발생했습니다.',
    READ: '할 일 조회 중 오류가 발생했습니다.',
    UPDATE: '할 일 업데이트 중 오류가 발생했습니다.',
    DELETE: '할 일 삭제 중 오류가 발생했습니다.'
  },
  TEAM: {
    CREATE: '팀 생성 중 오류가 발생했습니다.',
    READ: '팀 조회 중 오류가 발생했습니다.',
    UPDATE: '팀 업데이트 중 오류가 발생했습니다.',
    DELETE: '팀 삭제 중 오류가 발생했습니다.',
    MEMBER: {
      ADD: '팀 멤버 추가 중 오류가 발생했습니다.',
      UPDATE_ROLE: '팀 멤버 역할 업데이트 중 오류가 발생했습니다.',
      REMOVE: '팀 멤버 삭제 중 오류가 발생했습니다.'
    }
  }
};

module.exports = {
  VALIDATION_ERROR_MESSAGES,
  ERROR_MESSAGES
};
