const constants = require("../../constants/constants");

const TeamSchema = {
  id: {
    type: "integer",
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: "string",
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: "text",
    required: false,
    trim: true,
  },
  createdAt: {
    type: "timestamp",
    required: true,
    default: "CURRENT_TIMESTAMP",
  },
  createdBy: {
    type: "integer",
    required: true,
    references: "users.id",
  },
  updatedAt: {
    type: "timestamp",
    required: true,
    default: "CURRENT_TIMESTAMP",
  },
  updatedBy: {
    type: "integer",
    required: false,
    references: "users.id",
  },
};

const UserTeamSchema = {
  userId: {
    type: "integer",
    required: true,
    references: "users.id",
  },
  teamId: {
    type: "integer",
    required: true,
    references: "teams.id",
  },
  role: {
    type: "enum",
    values: Object.values(constants.TEAM_MEMBER_ROLES),
    default: constants.TEAM_MEMBER_ROLES.MANAGER,
  },
  joinedAt: {
    type: "timestamp",
    required: true,
    default: "CURRENT_TIMESTAMP",
  },
  __options: {
    underscored: true,
    indexes: [
      {
        name: "idx_user_team_unique",
        unique: true,
        fields: ["user_id", "team_id"],
      },
    ],
  },
};

const TeamInvitationSchema = {
  id: {
    type: "integer",
    primaryKey: true,
    autoIncrement: true,
  },
  teamId: {
    type: "integer",
    required: true,
    references: "teams.id",
  },
  inviterId: {
    type: "integer",
    required: true,
    references: "users.id",
  },
  inviteeId: {
    type: "integer",
    required: true,
    references: "users.id",
  },
  invitationMessage: {
    type: "text",
    required: false,
    trim: true,
  },
  invitationStatus: {
    type: "enum",
    values: Object.values(constants.TEAM_INVITATION_STATUS),
    required: true,
    default: constants.TEAM_INVITATION_STATUS.PENDING,
  },
  invitedAt: {
    type: "timestamp",
    required: true,
    default: "CURRENT_TIMESTAMP",
  },
  respondedAt: {
    type: "timestamp",
    required: false,
    default: null,
  },
  __options: {
    indexes: [
      {
        name: "idx_team_invitation_unique",
        unique: true,
        fields: ["teamId", "inviteeId", "invitationStatus"],
      },
    ],
  },
};

module.exports = {
  TeamSchema,
  UserTeamSchema,
  TeamInvitationSchema,
};
