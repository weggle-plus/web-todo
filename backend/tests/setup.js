// tests/setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

// 모든 테스트 전에 실행
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

// 각각의 테스트가 끝난 후 실행
afterEach(async () => {
  // 각 테스트 후 컬렉션 초기화
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

// 모든 테스트가 끝난 후 실행
afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

// 테스트 타임아웃 설정 (선택사항)
jest.setTimeout(30000);