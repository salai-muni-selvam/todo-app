import { getCredentials, saveCredentials } from "../../services/indexedDb";

export const loginUser =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const { password: confirmPassword } = await getCredentials(username);
      if (password !== confirmPassword) {
        alert("Password is Incorrect..Please Try Again");
        return;
      }
      dispatch({
        type: "LOGIN",
        payload: { username, password },
      });
    } catch (error) {
      console.error(error);
    }
  };

export const logOutUser = ({ username }) => ({
  type: "LOGOUT",
  payload: { username },
});

export const signUpUser =
  ({ username, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password is mismatch..");
        return;
      }
      await saveCredentials(username, password);
      dispatch({
        type: "SIGNUP",
        payload: { username, password, confirmPassword },
      });
    } catch (error) {
      console.error(error);
    }
  };
