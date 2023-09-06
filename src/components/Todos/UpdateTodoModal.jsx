import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/modal.scss";
import { addTodoAction } from "../../store/actions/todoActions";
import { useDispatch } from "react-redux";

const UpdateTodoModal = ({ setIsOpen, todo }) => {
  const dispatch = useDispatch();
  const todoRef = useRef();

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title mb-12">
          <h4>Update Todo</h4>
          <span className="modal-close" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div>
          <input
            className="mb-12 mt-6"
            type="text"
            defaultValue={todo.todo}
            ref={todoRef}
          />
          <button
            className="float-right"
            onClick={() => {
              dispatch(
                addTodoAction({
                  ...todo,
                  todo: todoRef.current?.value,
                })
              );
              setIsOpen(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>,

    document.getElementById("modal")
  );
};

export default UpdateTodoModal;
