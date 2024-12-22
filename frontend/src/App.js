import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Join from "./Join";
import localStorageModule from "./util/localStorage";
import TodoPage from "./pages/TodoPage";

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
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/join" element={<Join />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <TodoPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
