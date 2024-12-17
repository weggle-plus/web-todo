import axios from "axios";

// 백엔드 API URL
const BASE_URL = "http://localhost:3001/todo";

export interface Todo {
  id: number;
  title: string;
  status: boolean;
}

// API 함수들
const todoAPI = {
  // 모든 TODO 조회
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return response.data;
  },

  // 새로운 TODO 추가
  addTodo: async (title: string, status: boolean): Promise<Todo> => {
    const response = await axios.post(BASE_URL, { title, status });
    return response.data;
  },

  // TODO 수정
  updateTodo: async (id: number, updatedFields: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedFields);
    return response.data;
  },

  // TODO 삭제
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};

export default todoAPI;
