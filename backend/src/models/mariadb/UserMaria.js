const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mariadb');
const { UserSchema } = require('../interfaces/UserSchema');
const { convertToSequelizeSchema } = require('./utils/schemaConverter');

const User = sequelize.define(
  'User',
  convertToSequelizeSchema(UserSchema),
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
);

module.exports = User; 