const sequelize = require('../../config/mariadb');
const { UserSchema } = require('../interfaces/UserSchema');
const convertToSequelizeSchema = require('./utils/schemaConverter');

const convertedSchema = convertToSequelizeSchema(UserSchema);
const User = sequelize.define(
  'User',
  convertedSchema.attributes,
  {
    ...convertedSchema.options,
  }
);

module.exports = User; 