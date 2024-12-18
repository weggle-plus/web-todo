const TodoService = require('../../../src/services/TodoService');
const ServiceError = require('../../../src/utils/errors/ServiceError');
const { TODO_STATUS } = require('../../../src/models/interfaces/TodoSchema');

describe('TodoService', () => {
  let todoService;
  let mockTodoRepository;
  const mockTodo = {
    id: 1,
    title: '테스트 할일',
    content: '테스트 내용',
    status: TODO_STATUS.IN_PROGRESS,
    createdBy: 1,
    teamId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    mockTodoRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByTodoId: jest.fn(),
      findByTeamId: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn()
    };

    todoService = new TodoService(mockTodoRepository);
  });

  describe('createTodo', () => {
    const newTodoData = {
      title: '새로운 할일',
      content: '새로운 내용',
      status: TODO_STATUS.IN_PROGRESS
    };

    it('새로운 할일을 생성할 수 있다', async () => {
      mockTodoRepository.create.mockResolvedValue({ id: 1, ...newTodoData });
      
      const result = await todoService.createTodo(newTodoData);
      
      expect(mockTodoRepository.create).toHaveBeenCalledWith(newTodoData);
      expect(result).toMatchObject(newTodoData);
    });

    it('잘못된 상태값으로 생성시 에러가 발생한다', async () => {
      const invalidTodoData = {
        ...newTodoData,
        status: 'invalid-status'
      };

      await expect(
        todoService.createTodo(invalidTodoData)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('getTodoById', () => {
    it('ID로 할일을 조회할 수 있다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(mockTodo);
      
      const result = await todoService.getTodoById(1);
      
      expect(mockTodoRepository.findByTodoId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });

    it('존재하지 않는 ID로 조회시 에러가 발생한다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(null);
      
      await expect(
        todoService.getTodoById(999)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('getAllTodos', () => {
    it('모든 할일을 조회할 수 있다', async () => {
      const mockTodos = [mockTodo, { ...mockTodo, id: 2 }];
      mockTodoRepository.findAll.mockResolvedValue(mockTodos);
      
      const result = await todoService.getAllTodos();
      
      expect(mockTodoRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockTodos);
    });
  });

  describe('getTeamTodos', () => {
    it('팀의 모든 할일을 조회할 수 있다', async () => {
      const mockTeamTodos = [mockTodo];
      mockTodoRepository.findByTeamId.mockResolvedValue(mockTeamTodos);
      
      const result = await todoService.getTeamTodos(1);
      
      expect(mockTodoRepository.findByTeamId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTeamTodos);
    });
  });

  describe('getUserTodos', () => {
    it('사용자의 모든 할일을 조회할 수 있다', async () => {
      const mockUserTodos = [mockTodo];
      mockTodoRepository.findByUserId.mockResolvedValue(mockUserTodos);
      
      const result = await todoService.getUserTodos(1);
      
      expect(mockTodoRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUserTodos);
    });
  });

  describe('updateTodo', () => {
    const updateData = {
      title: '수정된 할일',
      content: '수정된 내용'
    };

    it('할일을 수정할 수 있다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(mockTodo);
      mockTodoRepository.update.mockResolvedValue({ ...mockTodo, ...updateData });
      
      const result = await todoService.updateTodo(1, updateData);
      
      expect(mockTodoRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toMatchObject(updateData);
    });

    it('존재하지 않는 할일 수정시 에러가 발생한다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(null);
      
      await expect(
        todoService.updateTodo(999, updateData)
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('updateTodoStatus', () => {
    it('할일의 상태를 변경할 수 있다', async () => {
      const newStatus = TODO_STATUS.DONE;
      mockTodoRepository.findByTodoId.mockResolvedValue(mockTodo);
      mockTodoRepository.update.mockResolvedValue({ ...mockTodo, status: newStatus });
      
      const result = await todoService.updateTodoStatus(1, newStatus);
      
      expect(mockTodoRepository.update).toHaveBeenCalledWith(1, { status: newStatus });
      expect(result.status).toBe(newStatus);
    });

    it('잘못된 상태값으로 변경시 에러가 발생한다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(mockTodo);
      
      await expect(
        todoService.updateTodoStatus(1, 'invalid-status')
      ).rejects.toThrow(ServiceError);
    });
  });

  describe('deleteTodo', () => {
    it('할일을 삭제할 수 있다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(mockTodo);
      mockTodoRepository.delete.mockResolvedValue(true);
      
      await todoService.deleteTodo(1);
      
      expect(mockTodoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('존재하지 않는 할일 삭제시 에러가 발생한다', async () => {
      mockTodoRepository.findByTodoId.mockResolvedValue(null);
      
      await expect(
        todoService.deleteTodo(999)
      ).rejects.toThrow(ServiceError);
    });
  });
}); 