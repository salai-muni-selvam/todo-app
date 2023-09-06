import React, { useState } from "react";
import "../../styles/todo.scss";
import { useDispatch } from "react-redux";
import {
  addTodoAction,
  deleteTodoAction,
} from "../../store/actions/todoActions";
import UpdateTodoModal from "./UpdateTodoModal";

const TodoItem = ({ todo, updateAllTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const addToAllTodos = (event) => {
    updateAllTodos(event.target.checked, todo);
  };
  return (
    <div className="todo-item">
      <div className="todo-group">
        <input type="checkbox" onChange={addToAllTodos} />
        <p className="todo-text">{todo.todo}</p>
      </div>
      <div className="todo-group">
        <select
          value={todo.status}
          onChange={(e) =>
            dispatch(
              addTodoAction({
                ...todo,
                status: e.target.value,
              })
            )
          }
        >
          <option value="New">New</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
          {todo.status}
        </select>
        <button className="bg-green" onClick={() => setIsOpen(true)}>
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="bg-red"
          onClick={() => dispatch(deleteTodoAction(todo.id))}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      {isOpen && <UpdateTodoModal setIsOpen={setIsOpen} todo={todo} />}
    </div>
  );
};

export default TodoItem;
