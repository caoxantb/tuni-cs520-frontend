import { ADD_TO_CART, REMOVE_FROM_CART, PURCHASE_CART, FETCH_CART } from "../constants";

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.payload;

    case ADD_TO_CART:
      return action.payload;

    case REMOVE_FROM_CART:
      return action.payload;

    case PURCHASE_CART:
      return [];

    default:
      return state;
  }
};

export default cartReducer;
