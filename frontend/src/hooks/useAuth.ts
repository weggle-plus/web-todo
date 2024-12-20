import { useState } from "react";
import { authAPI } from "../service/authAPI";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const { token } = await authAPI.login(username, password);
      localStorage.setItem("token", token);
      window.location.href = "/todo"; // 로그인 후 리다이렉트
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return { login, logout, error };
};
