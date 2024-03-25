import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataTestIds } from "../tests/constants/components";
import { useRedirect } from "../hooks/useRedirect";
import {
  addToCart,
  removeFromCart,
  fetchCart,
} from "../redux/actions/cartActions";
import { createOrder } from "../redux/actions/orderActions";
import { addNotification } from "../redux/actions/notificationActions";
import { useCallback, useEffect } from "react";
import { purchaseCart } from "../redux/actions/cartActions";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const {
    containerId: { main, empty, listItem },
    clickId: { reduce, add, submit },
    textId: { name, price, quantity },
  } = dataTestIds;

  useRedirect(["guest", "customer"]);

  const addToCartHandler = (cartItem) => {
    return () => dispatch(addToCart(cartItem));
  };

  const removeFromCartHandler = (cartItemId) => {
    return () => dispatch(removeFromCart(cartItemId));
  };

  const submitCartHandler = useCallback(() => {
    if (auth.user?.role === "guest") {
      navigate("/login");
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "You must be logged in to place an order",
        })
      );
      return;
    }
    const cartData = cart.map((cartItem) => {
      const { image, ...rest } = cartItem.product;
      return {
        product: rest,
        quantity: cartItem.quantity,
      };
    });
    dispatch(createOrder(cartData));
    dispatch(purchaseCart());
  });

  return (
    <div data-testid={main}>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        cart.map((cartItem) => (
          <div
            key={listItem(cartItem.product.id)}
            data-testid={listItem(cartItem.product.id)}
          >
            <button
              onClick={removeFromCartHandler(cartItem.product.id)}
              data-testid={reduce}
            >
              -
            </button>
            <button
              onClick={addToCartHandler(cartItem.product)}
              data-testid={add}
            >
              +
            </button>
            <Link data-testid={name} to={`/products/${cartItem.product.id}`}>
              {cartItem.product.name}
            </Link>
            <span data-testid={price}>{cartItem.product.price}</span>
            <span data-testid={quantity}>-quantity: {cartItem.quantity}</span>
          </div>
        ))
      ) : (
        <div data-testid={empty}></div>
      )}
      {!!cart.length && (
        <button data-testid={submit} onClick={submitCartHandler}>
          Submit
        </button>
      )}
    </div>
  );
};

export default Cart;
