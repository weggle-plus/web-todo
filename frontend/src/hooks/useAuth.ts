import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../service/authAPI";

/**
 * 쿠키에서 특정 이름의 값을 가져오는 함수
 * @param name - 쿠키의 이름
 * @returns 쿠키 값 (문자열) 또는 null
 */
const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}\(\)\[\]\\\/\\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 쿠키 기반 로그인 상태 확인
  const checkAuth = () => {
    const token = getCookie("jwt"); // 쿠키에서 JWT 확인
    setIsAuthenticated(!!token); // 토큰 존재 여부로 인증 상태 설정
    setLoading(false); // 로딩 완료
  };

  useEffect(() => {
    checkAuth(); // 컴포넌트 마운트 시 인증 상태 확인
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authAPI.login(email, password); // 로그인 API 호출
      setIsAuthenticated(true);
      navigate("/todo"); // 로그인 성공 시 TODO 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return { isAuthenticated, loading, login };
};

export default useAuth;
