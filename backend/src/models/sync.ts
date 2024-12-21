// models/index.ts
import sequelize from '../config/sequelize';
import Todo from './Todo';

(async () => {
  try {
    // 스키마 확인 및 생성
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS Todo_List');
    console.log('스키마 확인 또는 생성 완료');

    // 모델 동기화
    await sequelize.sync({ force: false });
    console.log('모델 동기화 완료');
  } catch (error) {
    console.error('데이터베이스 초기화 중 에러 발생:', error);
  }
})();
