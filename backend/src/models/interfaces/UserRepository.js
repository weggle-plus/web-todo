class UserRepository {
  async create(userData) {
    throw new Error('Method not implemented');
  }

  async login(email, password) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async update(id, userData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async updateLastLogin(id) {
    throw new Error('Method not implemented');
  }

  async updatePassword(id, newPassword) {
    throw new Error('Method not implemented');
  }

  async findUserTeams(userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = UserRepository; 