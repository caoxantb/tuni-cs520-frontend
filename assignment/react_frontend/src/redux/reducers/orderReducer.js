import { FETCH_ORDERS, CLEAR_ORDERS, CREATE_ORDER } from "../constants";

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return action.payload;

    case CLEAR_ORDERS:
      return [];

    case CREATE_ORDER:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default orderReducer;
