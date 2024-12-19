const UserService = require('../../../src/services/UserService');
const ServiceError = require('../../../src/utils/errors/ServiceError');
const ValidationError = require('../../../src/utils/errors/ValidationError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  let userService;
  let mockUserRepository;
  const mockUser = {
    id: 1,
    email: 'test@test.com',
    username: '테스트유저',
    password: 'hashedPassword123',
    isActive: true,
    role: 'user',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    toJSON: function() {
      return { ...this };
    }
  };

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateLastLogin: jest.fn(),
      updatePassword: jest.fn()
    };

    userService = new UserService(mockUserRepository);

    // bcrypt mock 설정
    bcrypt.compare.mockImplementation((password, hash) => 
      Promise.resolve(password === 'correctPassword')
    );
    bcrypt.hash.mockImplementation((password) => 
      Promise.resolve(`hashed_${password}`)
    );

    // jwt mock 설정
    jwt.sign.mockImplementation(() => 'mock_token');
  });

  describe('register', () => {
    const registerData = {
      email: 'new@test.com',
      username: '새사용자',
      password: 'password123'
    };

    it('새로운 사용자를 등록할 수 있다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue({
        id: 2,
        ...registerData,
        password: 'hashed_password123'
      });

      const result = await userService.register(registerData);

      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...registerData,
        password: expect.any(String)
      });
      expect(result.password).toBeUndefined();
    });

    it('이미 존재하는 이메일로 가입시 에러가 발생한다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        userService.register(registerData)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('login', () => {
    const loginData = {
      email: 'test@test.com',
      password: 'correctPassword'
    };

    it('올바른 인증정보로 로그인할 수 있다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await userService.login(loginData.email, loginData.password);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.password).toBeUndefined();
      expect(mockUserRepository.updateLastLogin).toHaveBeenCalledWith(mockUser.id);
    });

    it('존재하지 않는 이메일로 로그인시 에러가 발생한다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        userService.login(loginData.email, loginData.password)
      ).rejects.toThrow(ValidationError);
    });

    it('잘못된 비밀번호로 로그인시 에러가 발생한다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        userService.login(loginData.email, 'wrongPassword')
      ).rejects.toThrow(ValidationError);
    });

    it('비활성화된 계정으로 로그인시 에러가 발생한다', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        ...mockUser,
        isActive: false
      });

      await expect(
        userService.login(loginData.email, loginData.password)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getProfile', () => {
    it('사용자 프로필을 조회할 수 있다', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.getProfile(1);

      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username
      }));
      expect(result.password).toBeUndefined();
    });

    it('존재하지 않는 사용자 조회시 에러가 발생한다', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(
        userService.getProfile(999)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('updateProfile', () => {
    const updateData = {
      username: '수정된이름',
      email: 'updated@test.com'
    };

    it('프로필을 수정할 수 있다', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.update.mockResolvedValue({
        ...mockUser,
        ...updateData
      });

      const result = await userService.updateProfile(1, updateData);

      expect(mockUserRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toMatchObject(updateData);
    });

    it('다른 사용자가 사용 중인 이메일로 수정시 에러가 발생한다', async () => {
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.findByEmail.mockResolvedValue({
        ...mockUser,
        id: 2
      });

      await expect(
        userService.updateProfile(1, updateData)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteProfile', () => {
    it('프로필을 삭제할 수 있다', async () => {
      mockUserRepository.delete.mockResolvedValue(true);

      await userService.deleteProfile(1);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('존재하지 않는 프로필 삭제시 에러가 발생한다', async () => {
      mockUserRepository.delete.mockRejectedValue(new Error());

      await expect(
        userService.deleteProfile(999)
      ).rejects.toThrow();
    });
  });

  describe('_generateToken', () => {
    it('사용자 정보로 JWT 토큰을 생성할 수 있다', () => {
      const token = userService._generateToken(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role
        }),
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      expect(token).toBe('mock_token');
    });
  });
}); 