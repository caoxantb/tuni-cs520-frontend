import axios from "axios";

import { CLEAR_ORDERS, FETCH_ORDERS, CREATE_ORDER } from "../constants";
import { addNotification } from "./notificationActions";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { orders, auth } = getState();
    let newOrders = [];

    if (orders.length > 0) {
      return;
    }

    try {
      dispatch(
        addNotification({
          stateType: "order",
          status: "loading",
          message: "Loading order",
        })
      );
      const res = await axios.get("http://localhost:3001/api/orders", {
        withCredentials: true,
      });
      const orders = res.data;

      if (auth.user.role === "customer") {
        newOrders = orders.filter((order) => order.customerId === auth.user.id);
      } else if (auth.user.role === "guest") {
        newOrders = [];
      } else {
        newOrders = orders;
      }

      dispatch({
        type: FETCH_ORDERS,
        payload: newOrders,
      });
      dispatch(
        addNotification({
          stateType: "order",
          status: "success",
          message: "Successfully retrieved order",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "order",
          status: "error",
          message: "Errod retrieving order",
        })
      );
    }
  };
};

export const createOrder = (cartData) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "order",
          status: "loading",
          message: "Loading order",
        })
      );
      const res = await axios.post(
        "http://localhost:3001/api/orders",
        { items: cartData },
        { withCredentials: true }
      );
      const order = res.data;
      dispatch({
        type: CREATE_ORDER,
        payload: order,
      });
      dispatch(
        addNotification({
          stateType: "order",
          status: "success",
          message: "Successfully added order",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          stateType: "order",
          status: "error",
          message: "Errod adding to order",
        })
      );
      console.error(error);
    }
  };
};

export const clearOrders = () => ({
  type: CLEAR_ORDERS,
});
