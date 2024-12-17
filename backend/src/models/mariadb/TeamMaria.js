const sequelize = require('../../config/mariadb');
const { TeamSchema, UserTeamSchema } = require('../interfaces/TeamSchema');
const { convertToSequelizeSchema } = require('./utils/schemaConverter');
const User = require('./UserMaria');

const Team = sequelize.define(
  'Team',
  convertToSequelizeSchema(TeamSchema)
);

const UserTeam = sequelize.define(
  'UserTeam',
  convertToSequelizeSchema(UserTeamSchema)
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