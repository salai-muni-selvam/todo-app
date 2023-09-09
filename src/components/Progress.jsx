import React from "react";
import "../styles/progress.scss";
import { useSelector } from "react-redux";

const Progress = () => {
  const todos = useSelector((state) => state.todos.todos);

  const completed =
    (todos.filter((todo) => todo.status === "Completed").length /
      todos.length) *
      100 +
    "%";

  const inprogress =
    (todos.filter((todo) => todo.status === "InProgress").length /
      todos.length) *
      100 +
    "%";

  if (todos.length === 0) return null;

  return (
    <div className="progress-container flex">
      <div className="completed" style={{ width: completed }}></div>
      <div className="progress" style={{ width: inprogress }}></div>
    </div>
  );
};

export default Progress;
