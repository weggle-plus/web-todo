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
  username: {
    type: 'string',
    required: true
  },
  role: {
    type: 'enum',
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER
  },
  profileImage: {
    type: 'string',
    default: ''
  },
  isActive: {
    type: 'boolean',
    default: true
  },
  lastLogin: {
    type: 'date',
    default: null
  },
  createdAt: {
    type: 'date',
    default: new Date()
  },
  updatedAt: {
    type: 'date',
    default: new Date()
  }
};

module.exports = {
  UserSchema,
  USER_ROLES
}; 