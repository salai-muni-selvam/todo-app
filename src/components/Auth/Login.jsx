import React, { useState } from "react";
import "../../styles/login.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/authAuctions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const LoginUser = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData, navigate));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={LoginUser}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInputChange}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <h5 className="float-right my-2">
          New User? &nbsp;
          <span className="blue" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Login;
