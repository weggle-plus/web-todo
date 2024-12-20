import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const authAPI = {
  signup: async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/signup`, { username, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      { withCredentials: true } // 쿠키 포함 설정
    );
    return response.data;
  },

  logout: async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  },
};
