const User = require('./UserMaria');
const bcrypt = require('bcrypt');
const UserRepository = require('../interfaces/UserRepository');

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

  
  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.User.create({
      ...userData,
      password: hashedPassword
    });
    return this._excludePassword(user.toJSON());
  }

  async login(email, password) {
    const user = await this.User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    await this.updateLastLogin(user.id);
    return this._excludePassword(user.toJSON());
  }

  async findByEmail(email) {
    return await this.User.findOne({ where: { email } });
  }

  async findById(id) {
    const user = await this.User.findByPk(id);
    return user ? this._excludePassword(user.toJSON()) : null;
  }

  async update(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await this.User.update(updateData, { where: { id } });
    return await this.findById(id);
  }

  async updateLastLogin(id) {
    await this.User.update(
      { lastLogin: new Date() },
      { where: { id } }
    );
  }

  _excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return this.formatUserResponse(userWithoutPassword);
  }

  async findAll() {
    const users = await this.User.findAll();
    return users.map(user => this._excludePassword(user.toJSON()));
  }

  async delete(id) {
    const user = await this.User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return this._excludePassword(user.toJSON());
  }

  async updatePassword(userId, newPassword) {
    const user = await this.User.findByPk(userId);
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });
    return this._excludePassword(user.toJSON());
  }

  async findUserTeams(userId) {
    const user = await this.User.findByPk(userId, {
      include: [{
        model: Team,
        through: {
          attributes: ['role', 'joinedAt']
        }
      }]
    });
    return user ? user.Teams : [];
  }
}

module.exports = UserMariaRepository; 