class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  async createTodo(todoData) {
    // 기본적인 유효성 검사
    if (!todoData.title) {
      throw new Error('할 일의 제목은 필수입니다');
    }

    // 새로운 할 일 데이터 생성
    const newTodo = {
      ...todoData,
      status: todoData.status || '진행중',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 저장소에 저장
    return await this.todoRepository.create(newTodo);
  }

  async getAllTodos() {
    return await this.todoRepository.findAll();
  }

  async getTodoById(id) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('해당 할 일을 찾을 수 없습니다');
    }
    return todo;
  }

  async updateTodo(id, updateData) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('해당 할 일을 찾을 수 없습니다');
    }

    const updatedTodo = {
      ...todo,
      ...updateData,
      updatedAt: new Date()
    };

    return await this.todoRepository.update(id, updatedTodo);
  }

  async deleteTodo(id) {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new Error('해당 할 일을 찾을 수 없습니다');
    }

    await this.todoRepository.delete(id);
    return { message: '할 일이 성공적으로 삭제되었습니다' };
  }
}

module.exports = TodoService;