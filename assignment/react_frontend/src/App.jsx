import { Route, Routes } from "react-router-dom";
import { dataTestIds } from "./tests/constants/components";

import {UserList, UserPage, UserModifier} from "./components/user"
import {ProductList, ProductItem, ProductModifier} from "./components/product"
import {OrderList, OrderItem, Cart} from "./components/order"
import {AuthForm} from "./components/auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notification from "./components/Notification";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./redux/actions/authActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);

  return (
    <div data-testid={dataTestIds.containerId.app}>
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductItem />} />
        <Route
          path="/products/:productId/modify"
          element={<ProductModifier />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:orderId" element={<OrderItem />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserPage />}/>
        <Route path="/users/:userId/modify" element={<UserModifier />}/>
      </Routes>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
