const mongoose = require('mongoose');
const sequelize = require('./mariadb');
const config = require('./database');

async function initializeDatabase() {
  const dbType = process.env.DB_TYPE || 'mongodb';

  try {
    if (dbType === 'mongodb') {
      await mongoose.connect(config.mongodb.url);
      console.log('MongoDB 연결 성공');
    } else if (dbType === 'mariadb') {
      await sequelize.authenticate();
      await sequelize.sync(); // 테이블 자동 생성
      console.log('MariaDB 연결 성공');
    }
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error);
    process.exit(1);
  }
}

module.exports = initializeDatabase; 