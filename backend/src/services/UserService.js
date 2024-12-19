const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ServiceError = require('../utils/errors/ServiceError');
const AuthError = require('../utils/errors/AuthError');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    if (userData.username) {
      const existingUsername = await this.userRepository.findByUsername(userData.username);
      if (existingUsername) {
        throw ServiceError.usernameAlreadyExists();
      }
    }

    const user = await this.userRepository.create(userData);
    const token = this._generateToken(user);
    return {
      username: user.username,
      token
    };
  }

  async login(username, password) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw ServiceError.invalidUsernameOrPassword();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw ServiceError.invalidUsernameOrPassword();
    }

    await this.userRepository.updateLastLogin(user.id);
    
    const token = this._generateToken(user);

    return {
      username: user.username,
      token
    };
  }

  async getProfile(userId, id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw AuthError.forbidden();
    }
    if (user.id !== userId) {
      throw AuthError.forbidden();
    }
    return this.userRepository.formatUserResponse(user);
  }

  async updateProfile(userId, updateData) {
    if (updateData.username) {
      const existingUser = await this.userRepository.findByUsername(updateData.username);
      if (existingUser) {
        throw ServiceError.usernameAlreadyExists();
      }
    }

    return await this.userRepository.update(userId, updateData);
  }

  _generateToken(user) {
    return jwt.sign(
      { 
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  async deleteProfile(userId) {
    await this.userRepository.delete(userId);
  }
}

module.exports = UserService;