import { addtodo, deleteTodo, getAllTodos } from "../../services/indexedDb";

export const getAllTodosList = () => async (dispatch) => {
  try {
    const username = localStorage.getItem("isLoggedIn");
    const todos = await getAllTodos(username);
    dispatch({
      type: "GET_TODOS",
      payload: todos,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addTodoAction = (todo) => async (dispatch) => {
  try {
    const username = localStorage.getItem("isLoggedIn");
    await addtodo(todo, username);
    dispatch(getAllTodosList());
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    const username = localStorage.getItem("isLoggedIn");
    await deleteTodo(id, username);
    dispatch(getAllTodosList());
  } catch (error) {
    console.error(error);
  }
};
