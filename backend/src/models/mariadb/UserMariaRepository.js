const User = require('./UserMaria');
const bcrypt = require('bcrypt');
const UserRepository = require('../interfaces/UserRepository');
const ValidationError = require('../../utils/errors/ValidationError');

class UserMariaRepository extends UserRepository {
  constructor(UserModel = User) {
    super();
    this.User = UserModel;
  }

  formatUserResponse(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  _excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return this.formatUserResponse(userWithoutPassword);
  }

  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.User.create({
      ...userData,
      password: hashedPassword
    });
    return this._excludePassword(user.toJSON());
  }

  async findAll() {
    const users = await this.User.findAll();
    return users.map(user => this._excludePassword(user.toJSON()));
  }

  async findById(userId) {
    const user = await this.User.findByPk(userId);
    return user ? this._excludePassword(user.toJSON()) : null;
  }

  async findByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async update(userId, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await this.User.update(updateData, { where: { id: userId } });
    return await this.findById(userId);
  }

  async delete(userId) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      throw ValidationError.userNotFound();
    }
    await user.destroy();
    return this._excludePassword(user.toJSON());
  }

  async updateLastLogin(userId) {
    await this.User.update(
      { lastLogin: new Date() },
      { where: { id: userId } }
    );
  }

  async updatePassword(userId, newPassword) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      throw ValidationError.userNotFound();
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });
    return this._excludePassword(user.toJSON());
  }
}

module.exports = UserMariaRepository; 