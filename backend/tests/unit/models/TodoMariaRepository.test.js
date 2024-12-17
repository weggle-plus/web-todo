const TodoMariaRepository = require('../../../src/models/mariadb/TodoMariaRepository');
const { TodoSchema } = require('../../../src/models/interfaces/TodoSchema');
const { convertToSequelizeSchema } = require('../../../src/models/mariadb/utils/schemaConverter');
const sequelize = require('../../../tests/setup');


describe('TodoMariaRepository', () => {
  let todoRepository;
  let Todo;

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
  });

  describe('create()', () => {
    const sampleTodo = {
      title: '테스트 할일',
      content: '테스트 내용',
      status: 'in-progress'
    };

    it('새로운 할일을 생성할 수 있다', async () => {
      const created = await todoRepository.create(sampleTodo);
      
      expect(created).toMatchObject({
        ...sampleTodo,
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });

    it('필수 필드가 없으면 에러가 발생한다', async () => {
      const invalidTodo = { status: 'in-progress' };
      
      await expect(todoRepository.create(invalidTodo))
        .rejects
        .toThrow();
    });
  });

  describe('findAll()', () => {
    it('모든 할일 목록을 최신순으로 조회할 수 있다', async () => {
      const todos = [
        { title: '첫번째 할일', content: '내용1', status: 'in-progress' },
        { title: '두번째 할일', content: '내용2', status: 'done' }
      ];
      
      await Promise.all(todos.map(todo => todoRepository.create(todo)));
      
      const foundTodos = await todoRepository.findAll();
      expect(foundTodos).toHaveLength(2);
      expect(new Date(foundTodos[0].createdAt)).toBeGreaterThan(new Date(foundTodos[1].createdAt));
    });
  });


  describe('findById()', () => {
    it('ID로 특정 할일을 조회할 수 있다', async () => {
      const created = await todoRepository.create({
        title: '테스트 할일',
        content: '테스트 내용',
        status: 'in-progress'
      });
      
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
      const created = await todoRepository.create({
        title: '원래 할일',
        content: '원래 내용',
        status: 'in-progress'
      });

      const updateData = {
        title: '수정된 할일',
        content: '수정된 내용',
        status: 'done'
      };
      
      const updated = await todoRepository.update(created.id, updateData);
      
      expect(updated).toMatchObject({
        id: created.id,
        ...updateData
      });
    });

    it('존재하지 않는 ID로 수정 시도시 null을 반환한다', async () => {
      const updated = await todoRepository.update(999, { title: '수정' });
      expect(updated).toBeNull();
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

    it('존재하지 않는 ID로 삭제 시도시 null을 반환한다', async () => {
      const result = await todoRepository.delete(999);
      expect(result).toBeNull();
    });
  });
}); 