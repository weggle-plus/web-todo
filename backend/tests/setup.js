const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.TEST_DB_DATABASE,  // 테스트용 데이터베이스 이름
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
