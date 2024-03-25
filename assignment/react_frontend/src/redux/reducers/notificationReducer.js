import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];

    case REMOVE_NOTIFICATION:
      return state.filter((noti) => noti.stateType !== action.payload.stateType);

    default:
      return state;
  }
}

export default notificationReducer;