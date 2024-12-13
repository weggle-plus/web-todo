jest.setTimeout(10000); // 10초

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.DB_TYPE = 'mongodb'; // 테스트는 기본적으로 MongoDB로 실행
}); 