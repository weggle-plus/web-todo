const mongoose = require('mongoose');

jest.setTimeout(10000);

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.DB_TYPE = 'mongodb';
});

// 각 테스트 전에 연결이 열려있다면 닫기
beforeEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

// 각 테스트 후에 연결 종료
afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

// 모든 테스트 완료 후 최종 정리
afterAll(async () => {
  await mongoose.disconnect();
});