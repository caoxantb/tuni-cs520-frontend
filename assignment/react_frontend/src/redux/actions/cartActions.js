import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PURCHASE_CART,
} from "../constants";
import { addNotification } from "./notificationActions";

export const fetchCart = () => {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({
      type: FETCH_CART,
      payload: cart,
    });
  };
};

export const addToCart = (newProduct) => {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart;

    const existedProduct = cart.find(
      (item) => item.product.id === newProduct.id
    );

    if (existedProduct) {
      newCart = cart.map((item) =>
        item.product.id === newProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { product: newProduct, quantity: 1 }];
    }

    dispatch({
      type: ADD_TO_CART,
      payload: newCart,
    });

    dispatch(addNotification({
      stateType: "cart",
      status: "success",
      message: "Add to cart successfully",
    }))

    localStorage.setItem("cart", JSON.stringify(newCart));
  };
};

export const removeFromCart = (productId) => {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart;

    const productToRemove = cart.find((item) => item.product.id === productId);

    if (productToRemove.quantity > 1) {
      newCart = cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else if (productToRemove.quantity === 1) {
      newCart = cart.filter((item) => item.product.id !== productId);
    }

    dispatch({
      type: REMOVE_FROM_CART,
      payload: newCart,
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
  };
};

export const purchaseCart = () => {
  return (dispatch) => {
    localStorage.setItem("cart", JSON.stringify([]));

    dispatch({
      type: PURCHASE_CART,
    });
  };
};
