import { useParams } from "react-router-dom";
import { dataTestIds } from "../tests/constants/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRedirect } from "../hooks/useRedirect";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/actions/notificationActions";

const OrderItem = () => {
  const [orderItem, setOrderItem] = useState();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useRedirect(["admin", "customer"]);

  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        dispatch(
          addNotification({
            stateType: "order",
            status: "loading",
            message: "Loading single order",
          })
        );
        const res = await axios.get(
          `http://localhost:3001/api/orders/${orderId}`,
          {
            withCredentials: true,
          }
        );
        setOrderItem(res.data);
        dispatch(
          addNotification({
            stateType: "order",
            status: "success",
            message: "Success loading single order",
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          addNotification({
            stateType: "order",
            status: "error",
            message: "Error loading single order",
          })
        );
      }
    };

    fetchOrderItem();
  }, []);

  const {
    containerId: { inspect, listItem },
    textId: { name, quantity },
  } = dataTestIds;

  return (
    <div data-testid={inspect}>
      <h1>Order Item</h1>
      {!!orderItem?.items?.length &&
        orderItem.items.map((item) => (
          <div
            data-testid={listItem(item.product.id)}
            key={listItem(item.product.id)}
          >
            <span data-testid={name}>{item.product.name}</span>
            <span data-testid={quantity}>{item.quantity}</span>
          </div>
        ))}
    </div>
  );
};

export default OrderItem;
