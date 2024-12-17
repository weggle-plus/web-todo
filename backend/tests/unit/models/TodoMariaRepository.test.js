const TodoMariaRepository = require('../../../src/models/mariadb/TodoMariaRepository');
const { TodoSchema } = require('../../../src/models/interfaces/TodoSchema');
const { convertToSequelizeSchema } = require('../../../src/models/mariadb/utils/schemaConverter');
const sequelize = require('../../../tests/setup');

describe('TodoMariaRepository', () => {
  let todoRepository;
  let Todo;
  let Todo1;
  let Todo2;
  const sampleTodo = {
    title: '테스트 할일',
    content: '테스트 내용',
    status: 'in-progress'
  };

  beforeAll(async () => {
    await sequelize.authenticate(); // DB 연결 확인
    Todo = sequelize.define(
      'Todo',
      convertToSequelizeSchema(TodoSchema)
    );
    await sequelize.sync({ force: true });
    todoRepository = new TodoMariaRepository(Todo);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Todo.destroy({ truncate: true, cascade: true });
    
    const todos = [
      { title: '첫번째 할일', content: '내용1', status: 'in-progress' },
      { title: '두번째 할일', content: '내용2', status: 'done' }
    ];
    Todo1 = await todoRepository.create(todos[0]);
    Todo2 = await todoRepository.create(todos[1]);
  });

  describe('create()', () => {
    it('새로운 할일을 생성할 수 있다', async () => {
      const created = await todoRepository.create(sampleTodo);
      
      expect(created).toMatchObject({
        ...sampleTodo,
        id: expect.any(Number),
        title: sampleTodo.title,
        status: sampleTodo.status,
        content: sampleTodo.content,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        completedAt: sampleTodo.status === 'done' ? expect.any(Date) : undefined
      });
    });
  });

  describe('findAll()', () => {
    it('모든 할일 목록은 생성일 내림차순으로 정렬된다', async () => {
      const now = new Date();

      await todoRepository.create({ ...sampleTodo, createdAt: new Date(now.getTime() - 2000) }); // 2초 전
      await todoRepository.create({ ...sampleTodo, createdAt: now });

      const foundTodos = await todoRepository.findAll();
      expect(new Date(foundTodos[foundTodos.length - 2].createdAt).getTime())
        .toBeGreaterThan(new Date(foundTodos[foundTodos.length - 1].createdAt).getTime());
    });
  });


  describe('findById()', () => {
    it('ID로 특정 할일을 조회할 수 있다', async () => {
      const created = await todoRepository.create(sampleTodo);
      const found = await todoRepository.findById(created.id);
      
      expect(found).toMatchObject({
        id: created.id,
        title: created.title,
        content: created.content,
        status: created.status
      });
    });

    it('존재하지 않는 ID로 조회시 null을 반환한다', async () => {
      const found = await todoRepository.findById(999);
      expect(found).toBeNull();
    });
  });

  describe('update()', () => {
    it('할일을 수정할 수 있다', async () => {
      const updateData = {
        title: '수정된 할일',
        content: '수정된 내용',
        status: 'done'
      };
      
      const updated = await todoRepository.update(Todo2.id, updateData);
      
      expect(updated).toMatchObject({
        id: Todo2.id,
        ...updateData
      });
    });

    it('존재하지 않는 ID로 수정 시도시 에러를 반환한다', async () => {
      await expect(todoRepository.update(999, { title: '수정' })).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('할일을 삭제할 수 있다', async () => {
      const created = await todoRepository.create({
        title: '삭제할 할일',
        content: '내용',
        status: 'in-progress'
      });
      
      await todoRepository.delete(created.id);
      const found = await Todo.findByPk(created.id);
      
      expect(found).toBeNull();
    });

    it('존재하지 않는 ID로 삭제 시도시 에러를 반환한다', async () => {
      await expect(todoRepository.delete(999)).rejects.toThrow();
    });
  });
}); 