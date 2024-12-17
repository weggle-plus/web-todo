// TeamSchema.js

const TEAM_MEMBER_ROLES = {
  MANAGER: 'manager',
  MENTOR: 'mentor',
  MEMBER: 'member'  
};

const TeamSchema = {
  id: {
    type: 'integer',
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: 'string',
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: 'text',
    required: false,
    trim: true
  },
  createdAt: {
    type: 'date',
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: 'date',
    required: true,
    default: new Date()
  }
};

const UserTeamSchema = {
  userId: {
    type: 'integer',
    required: true,
    references: 'users.id'
  },
  teamId: {
    type: 'integer',
    required: true,
    references: 'teams.id'
  },
  role: {
    type: 'enum',
    enum: Object.values(TEAM_MEMBER_ROLES),
    default: TEAM_MEMBER_ROLES.MEMBER
  },
  joinedAt: {
    type: 'date',
    required: true,
    default: new Date()
  }
};

module.exports = {
  TeamSchema,
  UserTeamSchema,
  TEAM_MEMBER_ROLES
};