const sequelize = require('../../config/mariadb');
const { TeamSchema, UserTeamSchema } = require('../interfaces/TeamSchema');
const convertToSequelizeSchema = require('./utils/schemaConverter');
const User = require('./UserMaria');

const convertedTeamSchema = convertToSequelizeSchema(TeamSchema);
const Team = sequelize.define(
  'Team',
  convertedTeamSchema.attributes,
  convertedTeamSchema.options
);

const convertedUserTeamSchema = convertToSequelizeSchema(UserTeamSchema);
const UserTeam = sequelize.define(
  'UserTeam',
  convertedUserTeamSchema.attributes,
  convertedUserTeamSchema.options
);

// 다대다 관계 설정
Team.belongsToMany(User, { 
  through: UserTeam,
  as: 'members',
  foreignKey: 'teamId',
  otherKey: 'userId'
});

User.belongsToMany(Team, { 
  through: UserTeam,
  as: 'teams',
  foreignKey: 'userId',
  otherKey: 'teamId'
});

module.exports = { Team, UserTeam }; 