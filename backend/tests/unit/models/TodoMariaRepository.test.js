const TodoMariaRepository = require('../../../src/models/mariadb/TodoMariaRepository');
const { TodoSchema } = require('../../../src/models/interfaces/TodoSchema');
const { UserSchema } = require('../../../src/models/interfaces/UserSchema');
const { TeamSchema } = require('../../../src/models/interfaces/TeamSchema');
const convertToSequelizeSchema = require('../../../src/models/mariadb/utils/schemaConverter');
const sequelize = require('../../../tests/setup');

describe('TodoMariaRepository', () => {
  let todoRepository;
  let Todo;
  let User;
  let Team;
  let testUser;
  let testTeam;
  let Todo1;
  let Todo2;

  beforeAll(async () => {
    await sequelize.authenticate();
    
    // 모델 정의
    Todo = sequelize.define('Todo', convertToSequelizeSchema(TodoSchema));
    User = sequelize.define('User', convertToSequelizeSchema(UserSchema));
    Team = sequelize.define('Team', convertToSequelizeSchema(TeamSchema));

    // 관계 설정
    Todo.belongsTo(User, { foreignKey: 'createdBy' });
    Todo.belongsTo(Team, { foreignKey: 'teamId' });

    await sequelize.sync({ force: true });
    
    todoRepository = new TodoMariaRepository(Todo, User, Team);
  });

  beforeEach(async () => {
    await Todo.destroy({ truncate: true, cascade: true });
    
    // 테스트 사용자 생성
    testUser = await User.create({
      email: 'test@test.com',
      username: '테스트유저',
      password: 'password123'
    });

    // 테스트 팀 생성
    testTeam = await Team.create({
      name: '테스트팀',
      description: '테스트용 팀'
    });

    // 테스트 할일 생성
    const todos = [
      { 
        title: '첫번째 할일', 
        content: '내용1', 
        status: 'in-progress',
        createdBy: testUser.id,
        teamId: testTeam.id
      },
      { 
        title: '두번째 할일', 
        content: '내용2', 
        status: 'done',
        createdBy: testUser.id,
        teamId: testTeam.id
      }
    ];

    Todo1 = await todoRepository.create(todos[0]);
    Todo2 = await todoRepository.create(todos[1]);
  });

  // 새로운 테스트 추가
  describe('findByTeamId()', () => {
    it('팀 ID로 할일을 조회할 수 있다', async () => {
      const todos = await todoRepository.findByTeamId(testTeam.id);
      expect(todos).toHaveLength(2);
      expect(todos[0].teamId).toBe(testTeam.id);
    });

    it('존재하지 않는 팀 ID로 조회시 빈 배열을 반환한다', async () => {
      const todos = await todoRepository.findByTeamId(999);
      expect(todos).toHaveLength(0);
    });
  });

  describe('findByUserId()', () => {
    it('사용자 ID로 할일을 조회할 수 있다', async () => {
      const todos = await todoRepository.findByUserId(testUser.id);
      expect(todos).toHaveLength(2);
      expect(todos[0].createdBy).toBe(testUser.id);
    });

    it('존재하지 않는 사용자 ID로 조회시 빈 배열을 반환한다', async () => {
      const todos = await todoRepository.findByUserId(999);
      expect(todos).toHaveLength(0);
    });
  });

  // 기존 테스트들...
}); 