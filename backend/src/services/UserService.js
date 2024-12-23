const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ServiceError = require("../utils/errors/ServiceError");
const AuthError = require("../utils/errors/AuthError");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 유저 존재 검증
   * @param {string} userId - 유저의 ID
   * @returns {Promise<Object>} 유저 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async validateUserExists(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  /**
   * 유저 이름 중복 체크
   * @param {string} username - 유저의 이름
   * @returns {Promise<boolean>} 중복 여부
   */
  async isUsernameAvailable(username) {
    const user = await this.userRepository.findByUsername(username);
    return user ? false : true;
  }

  /**
   * 회원가입
   * @param {Object} userData - 유저 데이터
   * @returns {Promise<Object>} 생성된 유저 객체
   * @throws {ServiceError} (400 Bad Request, 409 Conflict)
   */
  async register(userData) {
    if (userData.username) {
      const isAvailable = await this.isUsernameAvailable(userData.username);
      if (!isAvailable) {
        throw ServiceError.usernameAlreadyExists();
      }
    }

    const user = await this.userRepository.create(userData);
    return {
      username: user.username,
    };
  }

  /**
   * 로그인
   * @param {string} username - 유저의 이름
   * @param {string} password - 유저의 비밀번호
   * @returns {Promise<Object>} 로그인된 유저 객체
   * @throws {AuthError} (401 Unauthorized)
   */
  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw AuthError.invalidUsernameOrPassword();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw AuthError.invalidUsernameOrPassword();
    }

    await this.userRepository.updateLastLogin(user.id);

    const token = this._generateToken(user);

    return {
      username: user.username,
      token,
    };
  }

  /**
   * 프로필 조회
   * @param {string} userId - 유저의 ID
   * @param {string} id - 조회할 유저의 ID
   * @returns {Promise<Object>} 유저 객체
   * @throws {AuthError} (401 Unauthorized, 403 Forbidden)
   */
  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    return this.userRepository.formatUserResponse(user);
  }

  /**
   * 프로필 업데이트
   * @param {string} userId - 유저의 ID
   * @param {Object} updateData - 업데이트할 유저 데이터
   * @returns {Promise<Object>} 업데이트된 유저 객체
   * @throws {AuthError} (400 Bad Request, 409 Conflict)
   */
  async updateProfile(userId, updateData) {
    await this.validateUserExists(userId);

    if (updateData.username) {
      const existingUser = await this.userRepository.findByUsername(
        updateData.username
      );
      if (existingUser) {
        throw AuthError.usernameAlreadyExists();
      }
    }
    const user = await this.userRepository.update(userId, updateData);
    if (updateData.username) {
      const token = this._generateToken(user);
      return {
        username: user.username,
        token,
      };
    }
    return user;
  }

  _generateToken(user) {
    return jwt.sign(
      {
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }

  async deleteProfile(userId) {
    await this.validateUserExists(userId);
    await this.userRepository.delete(userId);
  }
}

module.exports = UserService;
