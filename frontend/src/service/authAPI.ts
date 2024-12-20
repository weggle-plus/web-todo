import axios from "axios";

const BASE_URL = "http://localhost:3001/auth";

export const authAPI = {
  signup: async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/signup`, { username, password });
    return response.data;
  },
  login: async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  },
};
