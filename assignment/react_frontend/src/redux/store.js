import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  authReducer,
  cartReducer,
  productReducer,
  orderReducer,
  userReducer,
  notificationReducer,
} from "./reducers";

export const reducers = combineReducers({
  // Add reducers here
  cart: cartReducer,
  products: productReducer,
  auth: authReducer,
  orders: orderReducer,
  users: userReducer,
  notifications: notificationReducer,
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
