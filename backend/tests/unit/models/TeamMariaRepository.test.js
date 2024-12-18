const UserMariaRepository = require('../../../src/models/mariadb/UserMariaRepository');
const TeamMariaRepository = require('../../../src/models/mariadb/TeamMariaRepository');
const { UserSchema } = require('../../../src/models/interfaces/UserSchema');
const { TeamSchema, UserTeamSchema } = require('../../../src/models/interfaces/TeamSchema');
const { TEAM_MEMBER_ROLES } = require('../../../src/models/interfaces/TeamSchema');
const convertToSequelizeSchema = require('../../../src/models/mariadb/utils/schemaConverter');
const sequelize = require('../../../tests/setup');

describe('TeamMariaRepository', () => {
  let teamRepository;
  let userRepository;
  let testUser;
  let testTeam;
  let Team;
  let User;
  let UserTeam;

  beforeAll(async () => {
    await sequelize.authenticate();
    Team = sequelize.define('Team', convertToSequelizeSchema(TeamSchema));
    User = sequelize.define('User', convertToSequelizeSchema(UserSchema));
    UserTeam = sequelize.define('UserTeam', convertToSequelizeSchema(UserTeamSchema));

    Team.belongsToMany(User, { 
      through: UserTeam,
      as: 'members',
      foreignKey: 'teamId',
      otherKey: 'userId'
    });
    
    User.belongsToMany(Team, { 
      through: UserTeam,
      as: 'teams',
      foreignKey: 'userId',
      otherKey: 'teamId'
    });

    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.sync({ force: true });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.error('테이블 동기화 중 오류 발생:', error);
      throw error;
    }
    
    teamRepository = new TeamMariaRepository(User, Team, UserTeam);
    userRepository = new UserMariaRepository(User);
  });

  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await UserTeam.destroy({ truncate: true });
    await Team.destroy({ truncate: true });
    await User.destroy({ truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // 테스트 사용자 생성
    testUser = await userRepository.create({
      email: 'teammember@test.com',
      username: '팀원',
      password: 'password123'
    });

    // 테스트 팀 생성
    testTeam = await teamRepository.create({
      name: '테스트 팀',
      description: '설명'
    }, testUser.id);

    await teamRepository.addMember(testTeam.id, testUser.id, TEAM_MEMBER_ROLES.MEMBER);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('create()', () => {
    const sampleTeam = {
      name: '생성된 테스트 팀',
      description: '생성된 테스트 팀 설명'
    };

    it('새로운 팀을 생성할 수 있다', async () => {
      const created = await teamRepository.create(sampleTeam, testUser.id);
      
      expect(created).toMatchObject({
        ...sampleTeam,
        id: expect.any(Number)
      });
    });
  });

  describe('findAll()', () => {
    it('팀 조회시 멤버 정보를 함께 조회할 수 있다', async () => {
      const anotherTeam = await teamRepository.create({
        name: '두번째 팀',
        description: '설명'
      }, testUser.id);

      const teams = await teamRepository.findAll();
      expect(teams).toHaveLength(2);
      expect(teams[0].members).toBeDefined();
      expect(teams[1].members).toBeDefined();
    });
  });

  describe('findByTeamId()', () => {
    it('ID로 팀을 조회할 수 있다', async () => {
      const found = await teamRepository.findByTeamId(testTeam.id);
      expect(found.name).toBe('테스트 팀');
      expect(found.members).toHaveLength(1);
      expect(found.members[0].id).toBe(testUser.id);
    });
  });

  describe('addMember()', () => {
    let newUser;

    beforeEach(async () => {
      newUser = await userRepository.create({
        email: 'new@test.com',
        username: '새멤버',
        password: 'password123'
      });
    });

    it('팀에 새로운 멤버를 추가할 수 있다', async () => {
      const updated = await teamRepository.addMember(testTeam.id, newUser.id);
      expect(updated.members).toHaveLength(2);
      expect(updated.members[0].id).toBe(testUser.id); // 순서 보장 여부?
      expect(updated.members[1].id).toBe(newUser.id);
    });
  });

  describe('updateMemberRole()', () => {
    it('팀 멤버의 역할을 수정할 수 있다', async () => {
      await teamRepository.updateMemberRole(testTeam.id, testUser.id, TEAM_MEMBER_ROLES.MANAGER);
      const role = await teamRepository.getMemberRole(testTeam.id, testUser.id);
      expect(role).toBe(TEAM_MEMBER_ROLES.MANAGER);
    });
  });

  describe('getMemberRole()', () => {
    it('팀 멤버의 역할을 조회할 수 있다', async () => {
      const role = await teamRepository.getMemberRole(testTeam.id, testUser.id);
      expect(role).toBe(TEAM_MEMBER_ROLES.MEMBER);
    });
  });

  describe('removeMember()', () => {
    it('팀에서 멤버를 제거할 수 있다', async () => {
      const updatedTeam = await teamRepository.removeMember(testTeam.id, testUser.id);
      
      expect(updatedTeam.members).toBeUndefined();
    });
  });
}); 