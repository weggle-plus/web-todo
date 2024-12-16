const User = require('./UserMaria');
const bcrypt = require('bcrypt');
const UserRepository = require('../interfaces/UserRepository');

class UserMariaRepository extends UserRepository {
  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    return this._excludePassword(user.toJSON());
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    const user = await User.findByPk(id);
    return user ? this._excludePassword(user.toJSON()) : null;
  }

  async update(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await User.update(updateData, { where: { id } });
    return await this.findById(id);
  }

  async updateLastLogin(id) {
    await User.update(
      { lastLogin: new Date() },
      { where: { id } }
    );
  }

  _excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await User.findAll();
    return users.map(user => this._excludePassword(user.toJSON()));
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return this._excludePassword(user.toJSON());
  }

  async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password: hashedPassword },
      { where: { id } }
    );
    return await this.findById(id);
  }

  async findUserTeams(userId) {
    const user = await User.findByPk(userId, {
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