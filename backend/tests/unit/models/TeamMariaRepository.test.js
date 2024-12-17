const TeamMariaRepository = require('../../../src/models/mariadb/TeamMariaRepository');
const { UserSchema } = require('../../../src/models/interfaces/UserSchema');
const { TeamSchema, UserTeamSchema } = require('../../../src/models/interfaces/TeamSchema');
const { TEAM_MEMBER_ROLES } = require('../../../src/models/interfaces/TeamSchema');
const { convertToSequelizeSchema } = require('../../../src/models/mariadb/utils/schemaConverter');
const sequelize = require('../../../tests/setup');

describe('TeamMariaRepository', () => {
  let teamRepository;
  let testUser;
  let team;
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
  });

  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await UserTeam.destroy({ truncate: true });
    await Team.destroy({ truncate: true });
    await User.destroy({ truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // 테스트 사용자 생성
    testUser = await User.create({
      email: 'test@test.com',
      username: '테스트유저',
      password: 'password123'
    });

    // 테스트 팀 생성
    team = await teamRepository.create({
      name: '테스트 팀',
      description: '설명'
    }, testUser.id);
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

    it('이미 존재하는 팀 이름으로 팀을 생성하면 에러가 발생한다', async () => {
      await expect(
        teamRepository.create(sampleTeam, testUser.id)
      ).rejects.toThrow();
    });
  });

  describe('findAll()', () => {
    it('모든 팀 목록을 멤버 정보와 함께 조회할 수 있다', async () => {
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

  describe('findById()', () => {
    it('ID로 팀을 조회할 수 있다', async () => {
      const found = await teamRepository.findById(team.id);
      expect(found.name).toBe('테스트 팀');
      expect(found.members).toHaveLength(1);
      expect(found.members[0].id).toBe(testUser.id);
    });

    it('존재하지 않는 팀 ID로 조회시 null을 반환한다', async () => {
      const found = await teamRepository.findById(99999);
      expect(found).toBeNull();
    });
  });

  describe('addMember()', () => {
    let newUser;

    beforeEach(async () => {
      newUser = await User.create({
        email: 'new@test.com',
        username: '새멤버',
        password: 'password123'
      });
    });

    it('팀에 새로운 멤버를 추가할 수 있다', async () => {
      const updated = await teamRepository.addMember(team.id, newUser.id);
      expect(updated.members).toHaveLength(2);
    });

    it('이미 존재하는 멤버를 추가하면 에러가 발생한다', async () => {
      await teamRepository.addMember(team.id, newUser.id);
      await expect(
        teamRepository.addMember(team.id, newUser.id)
      ).rejects.toThrow();
    });

    it('존재하지 않는 팀에 멤버 추가시 에러가 발생한다', async () => {
      await expect(
        teamRepository.addMember(99999, newUser.id)
      ).rejects.toThrow();
    });

    it('존재하지 않는 사용자를 멤버로 추가시 에러가 발생한다', async () => {
      await expect(
        teamRepository.addMember(team.id, 99999)
      ).rejects.toThrow();
    });

    it('유효하지 않은 역할로 멤버 추가시 에러가 발생한다', async () => {
      await expect(
        teamRepository.addMember(team.id, testUser.id, 'INVALID_ROLE')
      ).rejects.toThrow();
    });
  });

  describe('updateMemberRole()', () => {
    it('팀 멤버의 역할을 수정할 수 있다', async () => {
      await teamRepository.updateMemberRole(team.id, testUser.id, TEAM_MEMBER_ROLES.MEMBER);
      const role = await teamRepository.getMemberRole(team.id, testUser.id);
      expect(role).toBe(TEAM_MEMBER_ROLES.MEMBER);
    });

    it('존재하지 않는 팀의 멤버 역할 수정시 에러가 발생한다', async () => {
      await expect(
        teamRepository.updateMemberRole(99999, testUser.id, TEAM_MEMBER_ROLES.MEMBER)
      ).rejects.toThrow();
    });

    it('팀에 속하지 않은 사용자의 역할 수정시 에러가 발생한다', async () => {
      const otherUser = await User.create({
        email: 'other@test.com',
        username: '다른유저',
        password: 'password123'
      });

      await expect(
        teamRepository.updateMemberRole(team.id, otherUser.id, TEAM_MEMBER_ROLES.MEMBER)
      ).rejects.toThrow();
    });

    it('유효하지 않은 역할로 수정시 에러가 발생한다', async () => {
      await expect(
        teamRepository.updateMemberRole(team.id, testUser.id, 'INVALID_ROLE')
      ).rejects.toThrow();
    });
  });

  describe('getMemberRole()', () => {
    it('팀 멤버의 역할을 조회할 수 있다', async () => {
      const role = await teamRepository.getMemberRole(team.id, testUser.id);
      expect(role).toBe(TEAM_MEMBER_ROLES.MANAGER);
    });

    it('존재하지 않는 팀의 멤버 역할 조회시 에러가 발생한다', async () => {
      await expect(
        teamRepository.getMemberRole(99999, testUser.id)
      ).rejects.toThrow();
    });

    it('팀에 속하지 않은 사용자의 역할 조회시 에러가 발생한다', async () => {
      const otherUser = await User.create({
        email: 'other@test.com',
        username: '다른유저',
        password: 'password123'
      });

      await expect(
        teamRepository.getMemberRole(team.id, otherUser.id)
      ).rejects.toThrow();
    });
  });

  describe('removeMember()', () => {
    it('팀에서 멤버를 제거할 수 있다', async () => {
      const newUser = await User.create({
        email: 'remove@test.com',
        username: '제거될멤버',
        password: 'password123'
      });
      
      await teamRepository.addMember(team.id, newUser.id);
      const updatedTeam = await teamRepository.removeMember(team.id, newUser.id);
      
      expect(updatedTeam.members).toHaveLength(1);
      expect(updatedTeam.members.find(m => m.id === newUser.id)).toBeUndefined();
    });

    it('존재하지 않는 팀의 멤버 제거시 에러가 발생한다', async () => {
      await expect(
        teamRepository.removeMember(99999, newUser.id)
      ).rejects.toThrow();
    });
  });
}); 