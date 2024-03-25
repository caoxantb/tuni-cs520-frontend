import { CLEAR_USERS, FETCH_USERS, REMOVE_USERS, UPDATE_USER } from "../constants";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;

    case REMOVE_USERS:
      return state.filter((user) => user.id !== action.payload);

    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );

    case CLEAR_USERS:
      return [];

    default:
      return state;
  }
};

export default userReducer;
