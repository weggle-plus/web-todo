const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ServiceError = require('../utils/errors/ServiceError');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw ServiceError.emailAlreadyExists();
    }

    return await this.userRepository.create(userData);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ServiceError.invalidEmailOrPassword();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw ServiceError.invalidEmailOrPassword();
    }

    await this.userRepository.updateLastLogin(user.id);

    const token = this._generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      user: userWithoutPassword,
      token
    };
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }

    if (updateData.email) {
      const existingUser = await this.userRepository.findByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw ServiceError.emailAlreadyExists();
      }
    }

    return await this.userRepository.update(userId, updateData);
  }

  _generateToken(user) {
    return jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role
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