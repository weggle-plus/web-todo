class UserRepository {
  async create(userData) {  // 사용자 생성
    throw new Error('Method not implemented');
  }

  async findAll() {  // 모든 사용자 조회
    throw new Error('Method not implemented');
  }

  async findById(userId) {  // 사용자 고유번호로 사용자 조회
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {  // 이메일로 사용자 조회
    throw new Error('Method not implemented');
  }

  async update(userId, userData) {  // 사용자 고유번호로 사용자 업데이트
    throw new Error('Method not implemented');
  }

  async delete(userId) {  // 사용자 고유번호로 사용자 삭제
    throw new Error('Method not implemented');
  }

  async updateLastLogin(userId) {  // 사용자 고유번호로 마지막 로그인 시간 업데이트
    throw new Error('Method not implemented');
  }
}

module.exports = UserRepository; 