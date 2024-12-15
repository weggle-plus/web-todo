const { Sequelize } = require('sequelize');
const { config } = require('./database');

const sequelize = new Sequelize(
  config.mariadb.database,
  config.mariadb.username,
  config.mariadb.password,
  {
    host: config.mariadb.host, 
    port: config.mariadb.port, 
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize; 