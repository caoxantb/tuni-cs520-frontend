import { useSelector, useDispatch } from "react-redux";
import { dataTestIds } from "../tests/constants/components";
import { useRedirect } from "../hooks/useRedirect";
import { useEffect } from "react";
import { fetchOrders } from "../redux/actions/orderActions";
import { Link } from "react-router-dom";

const OrderList = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const {
    containerId: { main, empty, listItem },
    textId: { id },
    linkId: { inspect },
  } = dataTestIds;

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  useRedirect(["admin", "customer"]);

  return (
    <div data-testid={main}>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        orders.map((orderItem) => (
          <div
            key={listItem(orderItem.id)}
            data-testid={listItem(orderItem.id)}
          >
            <span data-testid={id}>{orderItem.id}</span>
            <Link
              data-testid={inspect(orderItem.id)}
              to={`/orders/${orderItem.id}`}
            >
              Link to order
            </Link>
          </div>
        ))
      ) : (
        <div data-testid={empty}></div>
      )}
    </div>
  );
};

export default OrderList;
