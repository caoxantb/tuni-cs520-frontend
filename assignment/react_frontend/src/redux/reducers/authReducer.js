import { LOGIN, LOGOUT, CHECK_AUTH } from "../constants";

const authReducer = (state = { user: { role: "guest" } }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.payload,
      };
    case LOGOUT:
      return {
        user: { role: "guest" },
      };
    case CHECK_AUTH:
      return action.payload.role === state.user.role
        ? state
        : { user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
