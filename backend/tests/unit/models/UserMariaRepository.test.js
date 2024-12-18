const UserMariaRepository = require('../../../src/models/mariadb/UserMariaRepository');
const { UserSchema } = require('../../../src/models/interfaces/UserSchema');
const { convertToSequelizeSchema } = require('../../../src/models/mariadb/utils/schemaConverter');
const bcrypt = require('bcrypt');
const sequelize = require('../../../tests/setup');

describe('UserMariaRepository', () => {
  let userRepository;
  let User;
  let testUser;
  const testUserData = {
    email: 'test@test.com',
    username: '테스트유저',
    password: 'password123'
  };

  beforeAll(async () => {
    await sequelize.authenticate(); // DB 연결 확인
    User = await sequelize.define(
      'User', 
      convertToSequelizeSchema(UserSchema)
    );

    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await sequelize.sync({ force: true });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.error('테이블 동기화 중 오류 발생:', error);
      throw error;
    }
    userRepository = new UserMariaRepository(User);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await User.destroy({ truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    testUser = await userRepository.create(testUserData);
  });

  describe('create()', () => {
    const sampleUser = {
      email: 'sample@test.com',
      username: '샘플유저',
      password: 'password123'
    };

    it('새로운 사용자를 생성할 수 있다', async () => {
      const created = await userRepository.create(sampleUser);
      
      expect(created).toMatchObject({
        email: sampleUser.email,
        username: sampleUser.username
      });
      expect(created.password).toBeUndefined();
    });

    it('비밀번호를 해시화하여 저장한다', async () => {
      const created = await userRepository.create(sampleUser);
      const foundUser = await User.findByPk(created.id);      
      const isPasswordValid = await bcrypt.compare(sampleUser.password, foundUser.password);
      expect(isPasswordValid).toBe(true);
    });
  });

  describe('findAll()', () => {
    it('모든 사용자 목록을 조회할 수 있다', async () => {
      const users = [
        { email: 'test1@test.com', username: '테스트1', password: 'password123' },
        { email: 'test2@test.com', username: '테스트2', password: 'password123' }
      ];
      
      await Promise.all(users.map(userData => userRepository.create(userData)));
      
      const foundUsers = await userRepository.findAll();
      expect(foundUsers).toHaveLength(3);
      expect(foundUsers[0].password).toBeUndefined();
    });
  });

  describe('findByEmail()', () => {
    it('이메일로 사용자를 찾을 수 있다', async () => {
      await expect(userRepository.findByEmail(testUserData.email)).resolves.toBeDefined();
    });
  });

  describe('updatePassword()', () => {
    it('사용자 비밀번호를 업데이트할 수 있다', async () => {
      await userRepository.updatePassword(testUser.id, 'newpassword');
      const foundUser = await User.findByPk(testUser.id);
      const isPasswordValid = await bcrypt.compare('newpassword', foundUser.password);
      expect(isPasswordValid).toBe(true);
    });

    it('존재하지 않는 사용자의 비밀번호 변경 시 에러가 발생한다', async () => {
      await expect(
        userRepository.updatePassword(999999, 'newpassword')
      ).rejects.toThrow();
    });
  });

  describe('updateLastLogin()', () => {
    it('마지막 로그인 시간을 업데이트할 수 있다', async () => {
      await userRepository.updateLastLogin(testUser.id);
      
      const updatedUser = await userRepository.findById(testUser.id);
      expect(updatedUser.lastLogin).toBeInstanceOf(Date);
    });
  });

  describe('delete()', () => {
    it('사용자를 삭제할 수 있다', async () => {
      await userRepository.delete(testUser.id);
      const deletedUser = await userRepository.findById(testUser.id);
      expect(deletedUser).toBeNull();
    });
  
    it('존재하지 않는 사용자 삭제 시 에러를 반환한다', async () => {
      await expect(userRepository.delete(999)).rejects.toThrow();
    });
  });
}); 