import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { dataTestIds } from "../tests/constants/components";
import { Link } from "react-router-dom";
import { fetchProducts, removeProduct } from "../redux/actions/productActions";
import ProductCreator from "./ProductCreator";
import { addToCart } from "../redux/actions/cartActions";
import { useCallback } from "react";

const ProductList = () => {
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [productCreatorVisible, setProductCreatorVisible] = useState(false);

  const {
    containerId: { main, empty, listItem },
    textId,
    linkId: { inspect },
    clickId,
  } = dataTestIds;

  useEffect(() => {
    console.log("does run");
    dispatch(fetchProducts());
  }, []);

  const deleteHandler = (productId) => {
    return () => dispatch(removeProduct(productId));
  };

  const addToCartHandler = (product) => {
    return () => dispatch(addToCart(product));
  };

  const toggleProductCreatorVisible = () => {
    return () => setProductCreatorVisible(!productCreatorVisible);
  };

  console.log(products);

  return (
    <div data-testid={main}>
      <h1>Products</h1>
      {products.length > 0 ? (
        products.map((productItem) => (
          <div
            key={listItem(productItem.id)}
            data-testid={listItem(productItem.id)}
          >
            <span data-testid={textId.name}>{productItem.name}</span>
            <span data-testid={textId.price}>{productItem.price}</span>
            <Link
              data-testid={inspect(productItem.id)}
              to={`/products/${productItem.id}`}
            >
              Link to product
            </Link>
            {auth.user.role === "admin" ? (
              <>
                <Link
                  to={`/products/${productItem.id}/modify`}
                  data-testid={clickId.modify}
                >
                  Modify
                </Link>
                <button
                  data-testid={clickId.delete}
                  onClick={deleteHandler(productItem.id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                data-testid={clickId.add}
                onClick={addToCartHandler(productItem)}
              >
                Add
              </button>
            )}
          </div>
        ))
      ) : (
        <div data-testid={empty}></div>
      )}
      {auth.user.role === "admin" && (
        <button data-testid={clickId.add} onClick={toggleProductCreatorVisible()}>
          Add
        </button>
      )}
      {auth.user.role === "admin" && productCreatorVisible && (
        <ProductCreator setProductCreatorVisible={setProductCreatorVisible} />
      )}
    </div>
  );
};

export default ProductList;
