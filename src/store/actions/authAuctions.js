import {
  deleteDatabase,
  getCredentials,
  saveCredentials,
} from "../../services/indexedDb";

export const loginUser =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    try {
      const userDetails = await getCredentials(username);
      if (password !== userDetails?.password) {
        alert("Password is Incorrect..Please Try Again");
        return;
      }
      dispatch({
        type: "LOGIN",
        payload: username,
      });
      localStorage.setItem("isLoggedIn", username);
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };

export const logOutUser = (navigate) => async (dispatch) => {
  localStorage.removeItem("isLoggedIn");
  // await deleteDatabase();
  dispatch({
    type: "LOGOUT",
  });
  navigate("/");
};

export const signUpUser =
  ({ username, password, confirmPassword }, navigate) =>
  async (dispatch) => {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password is mismatch..");
        return;
      }
      await saveCredentials(username, password);
      dispatch({
        type: "LOGIN",
        payload: username,
      });
      localStorage.setItem("isLoggedIn", username);
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };
