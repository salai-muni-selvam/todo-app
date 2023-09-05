import { useSelector } from "react-redux";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <div>
      {/* <h1 className="app-title">Todo App</h1> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
