import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import localStorageModule from "./utils/localStorage";
import TodoPage from "./pages/TodoPage";
import { ROUTES } from "./utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorageModule.get("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="container">
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path={ROUTES.JOIN} element={<JoinPage />} />
        <Route
          path={ROUTES.TODO}
          element={
            isLoggedIn ? (
              <TodoPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
