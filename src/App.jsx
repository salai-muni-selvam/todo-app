import { useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./components/Todos/TodoList";
import AppTitle from "./components/AppTitle";

function App() {
  return (
    <div>
      <AppTitle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

function RequireAuth({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn && !sessionStorage.getItem("isLoggedIn")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
