import { Request, Response, NextFunction } from 'express';
import Todo from '../models/Todo';
import { asyncHandler } from '../utils/asyncHandler';

// 전체 Todo 리스트 가져오기
export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.findAll(); // 전체 레코드 조회
    res.status(200).json(todos);
  } catch (error) {
    next(error); // 에러를 Express에 넘김
  }
};

// 새로운 Todo 추가
export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contents } = req.body; // 요청 데이터에서 contents 가져옴
    const newTodo = await Todo.create({ contents, isdone: false });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// 특정 Todo 수정
export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { contents, isdone } = req.body;
  
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  
    // 업데이트
    todo.contents = contents ?? todo.contents;
    todo.isdone = isdone ?? todo.isdone;
    await todo.save();
  
    res.status(200).json(todo);
  });

// 특정 Todo 삭제
export const deleteTodo = asyncHandler (async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy(); // 레코드 삭제
    res.status(204).send(); // 성공적으로 삭제된 경우 응답 본문은 없음
  } catch (error) {
    next(error);
  }
});
