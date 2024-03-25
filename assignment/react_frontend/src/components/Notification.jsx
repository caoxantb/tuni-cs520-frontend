import { useSelector } from "react-redux";

import { dataTestIds } from "../tests/constants/components";

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);
  const {
    containerId: { empty, notification },
    notificationId,
  } = dataTestIds;

  return !notifications.length ? (
    <div data-testid={empty}>No new notification</div>
  ) : (
    <div data-testid={notification}>
      {notifications.map((noti) => (
        <p
          key={noti.stateType}
          data-testid={notificationId[noti.status](noti.stateType)}
        >
          {noti.message}
        </p>
      ))}
    </div>
  );
};

export default Notification;
