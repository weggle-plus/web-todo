import express from 'express';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/indexController';

const router = express.Router();

/* Todo 리스트 라우터 설정 */
router.get('/', getTodos);         // 전체 Todo 가져오기
router.post('/', addTodo);         // Todo 추가
router.put('/:id', updateTodo);   // Todo 수정
router.delete('/:id', deleteTodo);// Todo 삭제

export default router;


