import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

const timeoutIds = {
  auth: null,
  cart: null,
  notification: null,
  order: null,
  product: null,
  user: null,
};

export const addNotification = (newNotification) => (dispatch, getState) => {
  const { notifications } = getState();

  const existingNotification = notifications.find(
    (notification) => notification.stateType === newNotification.stateType
  );

  if (existingNotification) {
    dispatch(removeNotification(existingNotification));
    clearTimeout(timeoutIds[existingNotification.stateType]);
  }

  dispatch({
    type: ADD_NOTIFICATION,
    payload: newNotification,
  });

  timeoutIds[newNotification.stateType] = setTimeout(() => {
    dispatch(removeNotification(newNotification));
  }, 5000);
};

export const removeNotification = (notification) => ({
  type: REMOVE_NOTIFICATION,
  payload: notification,
});
