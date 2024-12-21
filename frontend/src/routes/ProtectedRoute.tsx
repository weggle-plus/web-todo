import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
}

/**
 * 보호된 경로를 렌더링하는 컴포넌트
 * @param children - 보호된 경로에 접근 가능한 경우 렌더링할 컴포넌트
 * @returns 인증된 경우 자식 컴포넌트를 렌더링, 아니면 로그인 페이지로 리다이렉트
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 인증 상태 확인 중
  }

  // 인증 상태에 따라 경로 보호
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
