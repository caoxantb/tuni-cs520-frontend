import { Link, useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../../tests/constants/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/actions/notificationActions";
import { removeProduct, fetchProducts } from "../../redux/actions/productActions";
import { useCallback } from "react";

const ProductItem = () => {
  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  const [productItem, setProductItem] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const deleteHandler = useCallback(() => {
    dispatch(removeProduct(productId));
    navigate(-1);
  });

  useEffect(() => {
    dispatch(fetchProducts());
    setProductItem(products.find((product) => product.id === productId));
  }, [products]);

  const {
    containerId: { inspect },
    textId: { name, description, price },
    clickId,
  } = dataTestIds;

  return (
    productItem && (
      <div data-testid={inspect}>
        <h1 data-testid={name}>{productItem.name}</h1>
        <div data-testid={description}>{productItem.description}</div>
        <div data-testid={price}>{productItem.price}</div>
        {auth.user.role !== "admin" ? (
          <div>
            <button data-testid={clickId.add}>Add</button>
          </div>
        ) : (
          <div>
            <Link
              data-testid={clickId.modify}
              to={`/products/${productId}/modify`}
            >
              Modify
            </Link>
            <button data-testid={clickId.delete} onClick={deleteHandler}>
              Delete
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default ProductItem;
