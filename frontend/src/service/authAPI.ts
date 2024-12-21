import axios from "axios";

const BASE_URL = "http://localhost:3000/users"; // 베이스 URL 설정

// 로그인 API
export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password }, { withCredentials: true });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("로그인 요청 실패:", error);
    throw error; // 에러 다시 던지기
  }
};

// 회원가입 API
export const signUpAPI = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, data);
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error; // 에러 다시 던지기
  }
};

// 로그아웃 API
export const logoutAPI = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    return response.data; // 로그아웃 결과 반환
  } catch (error) {
    console.error("로그아웃 요청 실패:", error);
    throw error; // 에러 다시 던지기
  }
};

export default { loginAPI, signUpAPI, logoutAPI };
