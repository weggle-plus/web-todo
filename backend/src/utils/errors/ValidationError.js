const ERROR_MESSAGES = {
  TODO: {
    TITLE_REQUIRED: "할 일의 제목은 필수입니다",
    STATUS_INVALID: "잘못된 상태값입니다. \"in-progress\" 또는 \"done\"만 가능합니다",
    NOT_FOUND: "해당 할 일을 찾을 수 없습니다"
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


class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }

  // Todo
  static todoTitleRequired() {
    return new Error(ERROR_MESSAGES.TODO.TITLE_REQUIRED);
  }

  static todoStatusInvalid() {
    return new Error(ERROR_MESSAGES.TODO.STATUS_INVALID);
  }

  static todoNotFound() {
    return new Error(ERROR_MESSAGES.TODO.NOT_FOUND);
  }

  // User
  static emailAlreadyExists() {
    return new Error(ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS);
  }

  static invalidEmailOrPassword() {
    return new Error(ERROR_MESSAGES.USER.INVALID_EMAIL_OR_PASSWORD);
  }

  static inactiveAccount() {
    return new Error(ERROR_MESSAGES.USER.INACTIVE_ACCOUNT);
  }

  static userNotFound() {
    return new Error(ERROR_MESSAGES.USER.NOT_FOUND);
  }

  // Team
  static teamNotFound() {
    return new Error(ERROR_MESSAGES.TEAM.NOT_FOUND);
  }

  static teamNameAlreadyExists() {
    return new Error(ERROR_MESSAGES.TEAM.NAME_ALREADY_EXISTS);
  }

  static teamMemberAlreadyExists() {
    return new Error(ERROR_MESSAGES.TEAM.MEMBER_ALREADY_EXISTS);
  }

  static teamMemberRoleInvalid() {
    return new Error(ERROR_MESSAGES.TEAM.MEMBER_ROLE_INVALID);
  }
}

module.exports = ValidationError;