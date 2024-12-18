const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

const UserSchema = {
  id: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  // TODO: failedLoginAttempts
  username: {
    type: 'string',
    required: false,
    default: null
  },
  role: {
    type: 'enum',
    values: Object.values(USER_ROLES),
    default: USER_ROLES.USER
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
        name: 'idx_users_email',  // 로그인 쿼리 최적화
        fields: ['email', 'password']
      }
    ]
  }
};

module.exports = {
  UserSchema,
  USER_ROLES
}; 