class TodoRepository {
  async create(todoData) {
    // 할 일 생성
    throw new Error("Method not implemented");
  }

  async findById(todoId) {
    // 특정 할 일 조회
    throw new Error("Method not implemented");
  }

  async findByUserId(userId) {
    // 사용자의 개인 할 일 조회
    throw new Error("Method not implemented");
  }

  async findByTeamId(teamId) {
    // 특정 팀의 할 일 조회
    throw new Error("Method not implemented");
  }

  async update(todoId, todoData) {
    // 할 일 업데이트
    throw new Error("Method not implemented");
  }

  async delete(todoId) {
    // 할 일 삭제
    throw new Error("Method not implemented");
  }
}

module.exports = TodoRepository;
