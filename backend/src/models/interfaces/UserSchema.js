const constants = require('../../constants/constants');

const UserSchema = {
  id: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  // TODO: failedLoginAttempts
  role: {
    type: 'enum',
    values: Object.values(constants.USER_ROLES),
    default: constants.USER_ROLES.USER
  },
  profileImage: {
    type: 'string',
    required: false,
    default: ''
  },
  isActive: {
    type: 'boolean',
    required: true,
    default: true
  },
  lastLoginAt: {
    type: 'timestamp',
    required: false,
    default: null
  },
  createdAt: {
    type: 'timestamp',
    required: true,
    default: 'CURRENT_TIMESTAMP'
  },
  updatedAt: {
    type: 'timestamp',
    required: true,
    default: 'CURRENT_TIMESTAMP'
  },
  __options: {
    underscored: true,
    indexes: [
      {
        name: 'idx_users_username',  // 로그인 쿼리 최적화
        fields: ['username', 'password']
      }
    ]
  }
};

module.exports = {
  UserSchema
}; 