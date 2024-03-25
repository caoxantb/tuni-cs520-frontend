import axios from "axios";

import { validEmailRegex } from "../../tests/constants/components";
import { LOGIN, LOGOUT, CHECK_AUTH } from "../constants";
import { addNotification } from "./notificationActions";

export const login = (loginData) => {
  return async (dispatch) => {
    const { email, password } = loginData;
    if (!validEmailRegex.test(email)) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid email",
        })
      );
      return false;
    }
    if (password.length < 10) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid password",
        })
      );
      return false;
    }
    try {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "loading",
          message: "Loading",
        })
      );
      const response = await axios.post(
        "http://localhost:3001/api/login",
        loginData,
        { withCredentials: true }
      );
      const user = response.data?.user;

      // localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: LOGIN, payload: user });
      dispatch(
        addNotification({
          stateType: "auth",
          status: "success",
          message: "Success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Error logging in",
        })
      );
      console.error(error);
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "loading",
          message: "Loading",
        })
      );
      await axios.get("http://localhost:3001/api/logout", {
        withCredentials: true,
      });

      dispatch({ type: LOGOUT });
      // localStorage.setItem("user", JSON.stringify({ user: { role: "guest" } }));
      dispatch(
        addNotification({
          stateType: "auth",
          status: "success",
          message: "Success",
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const register = (registerData) => {
  return async (dispatch) => {
    const { name, email, password, passwordConfirmation } = registerData;
    if (name.length < 3) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid name length",
        })
      );
      return false;
    }
    if (!validEmailRegex.test(email)) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid email",
        })
      );
      return false;
    }
    if (password.length < 10) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid password",
        })
      );
      return false;
    }
    if (password !== passwordConfirmation) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid password confirmation",
        })
      );
      return false;
    }
    try {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "loading",
          message: "Loading",
        })
      );
      const response = await axios.post(
        "http://localhost:3001/api/register",
        registerData,
        { withCredentials: true }
      );
      const user = response.data?.user;

      dispatch({ type: LOGIN, payload: user });
      // localStorage.setItem("user", JSON.stringify(user));
      dispatch(
        addNotification({
          stateType: "auth",
          status: "success",
          message: "Success",
        })
      );
      return true;
    } catch (error) {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Error registering user",
        })
      );
      console.error(error);
    }
  };
};

export const checkAuthentication = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/check-status",
        { withCredentials: true }
      );
      const user = response.data?.user;

      // const auth = JSON.parse(localStorage.getItem("user")) || {
      //   user: { role: "guest" },
      // };

      dispatch({ type: CHECK_AUTH, payload: user });
    } catch (error) {
      console.error(error);
    }
  };
};
