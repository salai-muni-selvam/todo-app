import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer";
import todoReducer from "./reducers/todoReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
