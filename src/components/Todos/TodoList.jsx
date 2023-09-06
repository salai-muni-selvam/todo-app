import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAction,
  deleteTodoAction,
  getAllTodosList,
} from "../../store/actions/todoActions";
import TodoItem from "./TodoItem";
import { formatDate } from "../../utils/formatDate";

const TodoList = () => {
  const todoRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    dispatch(getAllTodosList());
  }, []);

  const updateAllTodos = (isChecked, todo) => {
    if (isChecked) {
      setAllTodos([...allTodos, todo]);
    } else {
      setAllTodos(allTodos.filter((todos) => todos.id !== todo.id));
    }
  };

  useEffect(() => {
    if (todos.length === 0) setAllTodos([]);
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (!todoRef.current.value) return;
    dispatch(
      addTodoAction({
        todo: todoRef.current.value,
        time: formatDate(new Date()),
        status: "New",
      })
    );
    todoRef.current.value = "";
  };

  return (
    <div className="todo-container">
      <div className="todo-list">
        <h1>
          <i className="fas fa-list-ul"></i> &nbsp;Todo List
        </h1>
        <form onSubmit={addTodo} className="flex">
          <input
            className="bl-8"
            ref={todoRef}
            type="text"
            placeholder="Add a Todo.."
          />
          <button className="br-8">Add</button>
        </form>
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              updateAllTodos={updateAllTodos}
            />
          );
        })}
        {allTodos.length > 0 && (
          <div className="all-todos">
            <select
              onChange={(event) => {
                dispatch(
                  addTodoAction(
                    allTodos.map((todo) => {
                      return {
                        ...todo,
                        status: event.target.value,
                      };
                    })
                  )
                );
              }}
            >
              <option value="Completed">Completed</option>
              <option value="InProgress">Inprogress</option>
              <option value="New">New</option>
            </select>
            <button
              className="bg-red"
              onClick={() =>
                dispatch(deleteTodoAction(allTodos.map((todo) => todo.id)))
              }
            >
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
