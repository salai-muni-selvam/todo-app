import React, { useState } from "react";
import "../../styles/login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../store/actions/authAuctions";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const signupUser = (event) => {
    event.preventDefault();
    dispatch(signUpUser(formData));
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
        <h2>Signup</h2>
        <form onSubmit={signupUser}>
          <div className="form-group">
            <label htmlFor="signup-username">Username</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="signup-username"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Enter Your Password</label>
            <input
              onChange={handleInputChange}
              type="password"
              id="signup-password"
              name="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Your Password</label>
            <input
              onChange={handleInputChange}
              type="password"
              id="confirm-password"
              name="confirmPassword"
              required
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
        <h5 className="float-right my-2">
          Already Have an Account?{" "}
          <span className="blue" onClick={() => navigate("/")}>
            Login
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
