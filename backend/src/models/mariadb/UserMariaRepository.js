const User = require('./UserMaria');
const bcrypt = require('bcrypt');
const UserRepository = require('../interfaces/UserRepository');
const DatabaseError = require('../../utils/errors/DatabaseError');

class UserMariaRepository extends UserRepository {
  constructor(UserModel = User) {
    super();
    this.User = UserModel;
  }

  formatUserResponse(user) {
    return {
      email: user.email,
      username: user.username,
      lastLogin: user.lastLogin,
    };
  }

  formatUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.User.create({
      ...userData,
      password: hashedPassword
    });
    return this.formatUserResponse(user.toJSON());
  }

  async findAll() {
    const users = await this.User.findAll();
    return users.map(user => this.formatUser(user.toJSON()));
  }

  async findById(userId) {
    const user = await this.User.findByPk(userId);
    return user ? this.formatUser(user.toJSON()) : null;
  }

  // 비밀번호 포함이므로 취급주의
  async findByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async update(userId, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const result = await this.User.update(updateData, { 
      where: { id: userId } 
    });
    if (result[0] === 0) throw DatabaseError.userUpdateFailed();
    const updatedUser = await this.findById(userId);
    return this.formatUserResponse(updatedUser);
  }

  async delete(userId) {
    const result = await this.User.destroy({ where: { id: userId } });
    return result === 1;
  }

  async updateLastLogin(userId) {
    await this.User.update(
      { lastLoginAt: new Date() },
      { where: { id: userId } }
    );
  }
}

module.exports = UserMariaRepository; 