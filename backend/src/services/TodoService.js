const ServiceError = require('../utils/errors/ServiceError');
const AuthError = require('../utils/errors/AuthError');
const constants = require('../constants/constants');

class TodoService {
  constructor(todoRepository, userRepository) {
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }

  /**
   * TODO가 존재하는지 검증
   * @param {string} todoId - TODO의 ID
   * @returns {Promise<Object>} TODO 객체
   * @throws {ServiceError} TODO가 존재하지 않는 경우 에러 (404 Not Found)
   */
  async validateTodoExists(todoId) {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw ServiceError.todoNotFound();
    }
    return todo;
  }

  /**
   * 유저가 존재하는지 검증
   * @param {string} userId - 유저의 ID
   * @returns {Promise<Object>} 유저 객체
   * @throws {ServiceError} 유저가 존재하지 않는 경우 에러 (404 Not Found)
   */
  async validateUserExists(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw ServiceError.userNotFound();
    }
    return user;
  }

  /**
   * TODO 생성
   * @param {string} userId - 유저의 ID
   * @param {Object} todoData - TODO 데이터
   * @returns {Promise<Object>} 생성된 TODO 객체
   * @throws {ServiceError} (404 Not Found, 403 Forbidden)
   */
  async createTodo(userId, todoData) {
    await this.validateUserExists(userId);

    const todo = await this.todoRepository.create(todoData, userId);
    return this.todoRepository.formatTodoResponse(todo);
  }

  /**
   * 유저의 TODO 조회
   * @param {string} userId - 유저의 ID
   * @returns {Promise<Array>} TODO 목록
   * @throws {ServiceError} (404 Not Found)
   */
  async getUserTodos(userId) {
    await this.validateUserExists(userId);
    return await this.todoRepository.findByUserId(userId);
  }


  /**
   * TODO 조회
   * @param {string} todoId - TODO의 ID
   * @returns {Promise<Object>} TODO 객체
   * @throws {ServiceError} (404 Not Found)
   */
  async getTodoByTodoId(todoId) {
    const todo = await this.validateTodoExists(todoId);
    return this.todoRepository.formatTodoResponse(todo);
  }

  /**
   * TODO 업데이트
   * @param {string} userId - 유저의 ID
   * @param {string} todoId - TODO의 ID
   * @param {Object} updateData - 업데이트할 데이터
   * @returns {Promise<Object>} 업데이트된 TODO 객체
   * @throws {ServiceError} (404 Not Found, 403 Forbidden)
   */
  async updateTodo(userId, todoId, updateData) {
    await this.validateUserExists(userId);
    const todo = await this.validateTodoExists(todoId);

    if (todo.createdBy !== userId) {
      throw ServiceError.todoNotBelongToUser();
    }

    const updatedTodo = this._processUpdate(todo, updateData);
    return updatedTodo;
  }

  /**
   * TODO 상태 업데이트
   * @param {string} userId - 유저의 ID
   * @param {string} todoId - TODO의 ID
   * @returns {Promise<Object>} 업데이트된 TODO 객체
   * @throws {ServiceError} (404 Not Found, 403 Forbidden)
   */
  async updateTodoStatus(userId, todoId) {
    await this.validateUserExists(userId);
    const todo = await this.validateTodoExists(todoId);

    if (todo.createdBy !== userId) {
      throw ServiceError.todoNotBelongToUser();
    }

    const status = todo.status === constants.TODO_STATUS.DONE ? constants.TODO_STATUS.IN_PROGRESS : constants.TODO_STATUS.DONE;
    const updatedTodo = this._processUpdate(todo, { status });
    return updatedTodo;
  }

  /**
   * TODO 업데이트 처리
   * @param {Object} todo - TODO 객체
   * @param {Object} updates - 업데이트할 데이터
   * @returns {Promise<Object>} 업데이트된 TODO 객체
   */
  async _processUpdate(todo, updates) {
    const hasChanges = Object.keys(updates).some(key => 
      updates[key] !== todo[key]
    );

    if (!hasChanges) {
      return todo;
    }

    const updatedTodo = {
      ...todo,
      ...updates,
      updatedAt: new Date()
    };

    const newStatus = updates.status || todo.status;
    if (newStatus === constants.TODO_STATUS.DONE) {
      if (!todo.completedAt) {
        updatedTodo.completedAt = new Date();
      }
    } else {
      updatedTodo.completedAt = null;
    }
    return await this.todoRepository.update(todo.id, updatedTodo);
  }

  /**
   * TODO 삭제
   * @param {string} userId - 유저의 ID
   * @param {string} todoId - TODO의 ID
   * @returns {Promise<Object>} 삭제된 TODO 객체
   * @throws {ServiceError} (404 Not Found, 403 Forbidden)
   */
  async deleteTodo(userId, todoId) {
    const todo = await this.validateTodoExists(todoId);

    if (todo.createdBy !== userId) {
      throw ServiceError.todoNotBelongToUser();
    }


    return await this.todoRepository.delete(todoId);
  }
}

module.exports = TodoService;
