import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../store/actions/authAuctions";

const AppTitle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = auth.isLoggedIn || localStorage.getItem("isLoggedIn");
  return (
    <div className="app-title">
      <h1>Todo App</h1>
      {isLoggedIn && (
        <p>
          <i className="fas fa-user"></i> {auth.user} &nbsp;{" "}
          <button onClick={() => dispatch(logOutUser(navigate))}>Logout</button>
        </p>
      )}
    </div>
  );
};

export default AppTitle;
