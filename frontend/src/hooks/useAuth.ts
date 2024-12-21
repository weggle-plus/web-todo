import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../service/authAPI";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAPI(email, password);
      const token = response.token;
      if (token) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/todo");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return { isAuthenticated, loading, login, logout };
};

export default useAuth;
