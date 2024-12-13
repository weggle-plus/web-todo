const sequelize = require('../../../config/mariadb');
const TodoMariaRepository = require('../../../src/models/mariadb/TodoMariaRepository');
const Todo = require('../../../src/models/mariadb/TodoMaria');

let todoRepository;

beforeAll(async () => {
  // 테스트용 SQLite 메모리 DB 설정
  await sequelize.sync({ force: true });
  todoRepository = new TodoMariaRepository();
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Todo.destroy({ truncate: true });
});

describe('TodoMariaRepository', () => {
  const sampleTodo = {
    title: '테스트 할일',
    status: '진행중'
  };

  test('create: 새로운 할일을 생성할 수 있다', async () => {
    const created = await todoRepository.create(sampleTodo);
    
    expect(created.title).toBe(sampleTodo.title);
    expect(created.status).toBe(sampleTodo.status);
    expect(created.id).toBeDefined();
  });

  test('findAll: 모든 할일을 조회할 수 있다', async () => {
    await todoRepository.create(sampleTodo);
    await todoRepository.create({ ...sampleTodo, title: '두 번째 할일' });

    const todos = await todoRepository.findAll();
    
    expect(todos).toHaveLength(2);
    expect(todos[0].title).toBe('두 번째 할일');
  });

  test('findById: ID로 특정 할일을 조회할 수 있다', async () => {
    const created = await todoRepository.create(sampleTodo);
    
    const found = await todoRepository.findById(created.id);
    
    expect(found.title).toBe(sampleTodo.title);
  });

  test('update: 할일을 수정할 수 있다', async () => {
    const created = await todoRepository.create(sampleTodo);
    const updateData = { title: '수정된 할일' };
    
    const updated = await todoRepository.update(created.id, updateData);
    
    expect(updated.title).toBe(updateData.title);
    expect(updated.status).toBe(sampleTodo.status);
  });

  test('updateStatus: 할일의 상태를 변경할 수 있다', async () => {
    const created = await todoRepository.create(sampleTodo);
    
    const updated = await todoRepository.updateStatus(created.id, '완료');
    
    expect(updated.status).toBe('완료');
  });

  test('delete: 할일을 삭제할 수 있다', async () => {
    const created = await todoRepository.create(sampleTodo);
    
    await todoRepository.delete(created.id);
    const found = await todoRepository.findById(created.id);
    
    expect(found).toBeNull();
  });
}); 