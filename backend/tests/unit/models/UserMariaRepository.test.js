const UserMariaRepository = require('../../../src/models/mariadb/UserMariaRepository');
const { UserSchema } = require('../../../src/models/interfaces/UserSchema');
const { convertToSequelizeSchema } = require('../../../src/models/mariadb/utils/schemaConverter');
const bcrypt = require('bcrypt');
const sequelize = require('../../../tests/setup');

describe('UserMariaRepository', () => {
  let userRepository;
  let User;

  beforeAll(async () => {
    await sequelize.authenticate(); // DB 연결 확인
    User = sequelize.define(
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
  });

  describe('create()', () => {
    const sampleUser = {
      email: 'test@test.com',
      username: '테스트유저',
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
      const foundUser = await userRepository.findByEmail(sampleUser.email);
      
      const isPasswordValid = await bcrypt.compare(sampleUser.password, foundUser.password);
      expect(isPasswordValid).toBe(true);
    });
  });

  describe('findByEmail()', () => {
    it('이메일로 사용자를 찾을 수 있다', async () => {
      const user = await userRepository.create({
        email: 'test@test.com',
        username: '테스트유저',
        password: 'password123'
      });

      const found = await userRepository.findByEmail('test@test.com');
      expect(found.email).toBe(user.email);
    });
  });

  describe('updatePassword()', () => {
    it('사용자 비밀번호를 업데이트할 수 있다', async () => {
      const user = await userRepository.create({
        email: 'test@test.com',
        username: '테스트유저',
        password: 'oldpassword'
      });

      await userRepository.updatePassword(user.id, 'newpassword');
      
      const loginUser = await userRepository.login(user.email, 'newpassword');
      expect(loginUser.email).toBe(user.email);
    });

    it('존재하지 않는 사용자의 비밀번호 변경 시 에러가 발생한다', async () => {
      await expect(
        userRepository.updatePassword(999999, 'newpassword')
      ).rejects.toThrow();
    });
  });

  describe('updateLastLogin()', () => {
    it('마지막 로그인 시간을 업데이트할 수 있다', async () => {
      const user = await userRepository.create({
        email: 'test@test.com',
        username: '테스트유저',
        password: 'password123'
      });

      await userRepository.updateLastLogin(user.id);
      
      const updatedUser = await userRepository.findById(user.id);
      expect(updatedUser.lastLogin).toBeInstanceOf(Date);
    });
  });
}); 