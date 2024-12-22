const TODO_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done'
};

const TODO_TITLE_MAX_LENGTH = 255;

const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;
const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 30;

const TEAM_LIMIT = 20;  // 사용자가 속할 수 있는 팀 제한
const TEAM_MEMBER_LIMIT = 100;  // 팀원 제한
const TEAM_NAME_MIN_LENGTH = 2;
const TEAM_NAME_MAX_LENGTH = 50;

const TEAM_MEMBER_ROLES = {
  MANAGER: 'manager',
  MENTOR: 'mentor',
  MEMBER: 'member'  
};

const TEAM_INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

const TEAM_MEMBER_ACTIONS = {
  ACCEPT: 'accept',
  REJECT: 'reject',
  LEAVE: 'leave'
};


module.exports = {
  TODO_STATUS,
  TODO_TITLE_MAX_LENGTH,
  USER_ROLES,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  TEAM_LIMIT,
  TEAM_MEMBER_LIMIT,
  TEAM_NAME_MIN_LENGTH,
  TEAM_NAME_MAX_LENGTH,
  TEAM_MEMBER_ACTIONS,
  TEAM_MEMBER_ROLES,
  TEAM_INVITATION_STATUS
};