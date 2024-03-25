import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
} from "../constants";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;

    case CREATE_PRODUCT:
      return [...state, action.payload];

    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );

    case REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.payload);

    default:
      return state;
  }
};

export default productReducer