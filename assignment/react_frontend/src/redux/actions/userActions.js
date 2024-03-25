import axios from "axios";
import { addNotification } from "./notificationActions";
import { CLEAR_USERS, FETCH_USERS, REMOVE_USERS, UPDATE_USER } from "../constants";

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const { users, auth } = getState();

    if (users.length > 0) {
      return;
    }

    try {
      dispatch(
        addNotification({
          stateType: "user",
          status: "loading",
          message: "Loading",
        })
      );
      const res = await axios.get("http://localhost:3001/api/users", {
        withCredentials: true,
      });
      const users = res.data;

      dispatch({
        type: FETCH_USERS,
        payload: users,
      });
      dispatch(
        addNotification({
          stateType: "user",
          status: "success",
          message: "Successfully retrieved users",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "user",
          status: "error",
          message: "Error loading users",
        })
      );
    }
  };
};

export const updateUser = (userId, userBody) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "user",
          status: "loading",
          message: "Loading",
        })
      );
      const res = await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        userBody,
        {
          withCredentials: true,
        }
      );
      const updatedUser = res.data;
      dispatch({
        type: UPDATE_USER,
        payload: updatedUser,
      });
      dispatch(
        addNotification({
          stateType: "user",
          status: "success",
          message: "Successfully updated user",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "user",
          status: "error",
          message: "Error updating user",
        })
      );
    }
  };
};

export const removeUsers = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "user",
          status: "loading",
          message: "Loading",
        })
      );
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        withCredentials: true,
      });
      dispatch({
        type: REMOVE_USERS,
        payload: userId,
      });
      dispatch(
        addNotification({
          stateType: "user",
          status: "success",
          message: "Delete users successfully",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addNotification({
          stateType: "user",
          status: "error",
          message: "Error deleting users",
        })
      );
    }
  };
};

export const clearUsers = () => ({ type: CLEAR_USERS });
