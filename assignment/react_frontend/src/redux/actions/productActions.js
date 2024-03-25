import axios from "axios";

import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
} from "../constants";
import { addNotification } from "./notificationActions";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { products } = getState();

    if (products.length > 0) {
      return;
    }

    try {
      dispatch(
        addNotification({
          stateType: "product",
          status: "loading",
          message: "Loading",
        })
      );
      const res = await axios.get("http://localhost:3001/api/products");
      dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data,
      });
      dispatch(
        addNotification({
          stateType: "product",
          status: "success",
          message: "Retrieved products successfully",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "product",
          status: "error",
          message: "Retrieved products error",
        })
      );
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "product",
          status: "loading",
          message: "Loading",
        })
      );
      const res = await axios.post(
        "http://localhost:3001/api/products",
        product,
        { withCredentials: true }
      );
      const newProduct = res.data;
      dispatch({
        type: CREATE_PRODUCT,
        payload: newProduct,
      });
      dispatch(
        addNotification({
          stateType: "product",
          status: "success",
          message: "Create products successfully",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "product",
          status: "error",
          message: "Create products error",
        })
      );
    }
  };
};

export const updateProduct = (productId, productBody) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "product",
          status: "loading",
          message: "Loading",
        })
      );
      const res = await axios.put(
        `http://localhost:3001/api/products/${productId}`,
        productBody,
        {
          withCredentials: true,
        }
      );
      const updatedProduct = res.data;
      dispatch({
        type: UPDATE_PRODUCT,
        payload: updatedProduct,
      });
      dispatch(
        addNotification({
          stateType: "product",
          status: "success",
          message: "Successfully updated product",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "product",
          status: "error",
          message: "Updated products error",
        })
      );
    }
  };
};

export const removeProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "product",
          status: "loading",
          message: "Loading",
        })
      );
      await axios.delete(`http://localhost:3001/api/products/${productId}`, {
        withCredentials: true,
      });
      dispatch({
        type: REMOVE_PRODUCT,
        payload: productId,
      });
      dispatch(
        addNotification({
          stateType: "product",
          status: "success",
          message: "Successfully removed product",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "product",
          status: "error",
          message: "Rempved products error",
        })
      );
    }
  };
};
