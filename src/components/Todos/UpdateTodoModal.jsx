import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../../styles/modal.scss";
import { addTodoAction } from "../../store/actions/todoActions";
import { useDispatch } from "react-redux";

const UpdateTodoModal = ({ setIsOpen, todo }) => {
  const dispatch = useDispatch();
  const todoRef = useRef();

  const updateModal = (event) => {
    event.preventDefault();
    dispatch(
      addTodoAction({
        ...todo,
        todo: todoRef.current?.value,
      })
    );
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".modal-content") &&
      !["bg-green", "fas fa-edit"].includes(event.target.className)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-title mb-12">
          <h4>Update Todo</h4>
          <span className="modal-close" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <form className="flex flex-col" onSubmit={updateModal}>
          <input
            className="mb-12 mt-6"
            type="text"
            defaultValue={todo.todo}
            ref={todoRef}
          />
          <button className="jusify-self-end" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>,

    document.getElementById("modal")
  );
};

export default UpdateTodoModal;
