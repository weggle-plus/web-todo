// 환경변수 설정 로드
const dotenv = require("dotenv");
dotenv.config();

const config = {
  type: process.env.DB_TYPE || "mariadb",
  mongodb: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/todo-app",
  },
  mariadb: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "todo_app",
  },
};

/**
 * 데이터베이스 초기화 함수
 * 환경 변수에 설정된 DB_TYPE에 따라 MongoDB 또는 MariaDB 연결을 수행
 * @returns {Promise<void>}
 */
async function initializeDatabase() {
  // 환경 변수에서 DB_TYPE을 가져옴. 기본값은 'mariadb'
  const dbType = config.type;

  try {
    if (dbType === "mongodb") {
      const mongoose = require("mongoose");
      await mongoose.connect(config.mongodb.url);
      console.log("MongoDB 연결 성공");
    } else if (dbType === "mariadb") {
      const sequelize = require("./mariadb");
      await sequelize.authenticate(); // DB 연결 확인

      await sequelize.sync({
        force: true,
      });
      console.log("MariaDB 연결 성공");
    }
  } catch (error) {
    // 데이터베이스 연결 실패 시 에러 처리
    if (dbType === "mongodb") {
      console.error("MongoDB 연결 실패:", error);
    } else {
      console.error("MariaDB 연결 실패:", error);
    }
    // 심각한 오류이므로 애플리케이션 종료
    process.exit(1);
  }
}

module.exports = {
  config,
  initializeDatabase,
};
