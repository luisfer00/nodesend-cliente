import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import appReducer from "./reducers/app";

export default createStore(
  combineReducers({ auth: authReducer, app: appReducer}),
  compose(applyMiddleware(thunk)) // composeWithDevTools(applyMiddleware(thunk))
);
