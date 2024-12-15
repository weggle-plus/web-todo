const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Todo API 통합 테스트', () => {
  let mongoServer;
  let createdTodoId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('TODO 생성 - POST /todos', () => {
    it('새로운 TODO를 생성할 수 있다', async () => {
      const newTodo = {
        title: '테스트 할일',
        content: '테스트 내용'
      };

      const response = await request(app)
        .post('/todos')
        .send(newTodo)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newTodo.title);
      expect(response.body.content).toBe(newTodo.content);
      expect(response.body.status).toBe('진행중'); // 기본 상태 검증

      createdTodoId = response.body.id; // 다른 테스트에서 사용하기 위해 저장
    });
  });

  describe('TODO 조회 - GET /todos', () => {
    it('모든 TODO를 조회할 수 있다', async () => {
      const response = await request(app)
        .get('/todos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('특정 TODO를 ID로 조회할 수 있다', async () => {
      const response = await request(app)
        .get(`/todos/${createdTodoId}`)
        .expect(200);

      expect(response.body.id).toBe(createdTodoId);
    });
  });

  describe('TODO 수정 - PUT /todos/:id', () => {
    it('TODO 내용을 수정할 수 있다', async () => {
      const updatedTodo = {
        title: '수정된 할일',
        content: '수정된 내용'
      };

      const response = await request(app)
        .put(`/todos/${createdTodoId}`)
        .send(updatedTodo)
        .expect(200);

      expect(response.body.title).toBe(updatedTodo.title);
      expect(response.body.content).toBe(updatedTodo.content);
    });
  });

  describe('TODO 상태 변경 - PATCH /todos/:id/status', () => {
    it('TODO의 상태를 변경할 수 있다', async () => {
      const response = await request(app)
        .patch(`/todos/${createdTodoId}/status`)
        .send({ status: '완료' })
        .expect(200);

      expect(response.body.status).toBe('완료');
    });
  });

  describe('TODO 삭제 - DELETE /todos/:id', () => {
    it('TODO를 삭제할 수 있다', async () => {
      await request(app)
        .delete(`/todos/${createdTodoId}`)
        .expect(204);

      // 삭제 확인
      await request(app)
        .get(`/todos/${createdTodoId}`)
        .expect(404);
    });
  });
});