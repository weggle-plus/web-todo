import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PublicRouteProps {
  children: JSX.Element;
  redirectTo?: string; // 로그인 상태에서 리다이렉트할 경로
}

/**
 * 공개된 경로를 렌더링하는 컴포넌트
 * @param children - 공개된 경로에 접근 가능한 경우 렌더링할 컴포넌트
 * @returns 인증되지 않은 경우 자식 컴포넌트를 렌더링, 인증된 경우 리다이렉트
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 인증 상태 확인 중
  }
  
  return !isAuthenticated ? children : <Navigate to="/todo" />;
};

export default PublicRoute;
