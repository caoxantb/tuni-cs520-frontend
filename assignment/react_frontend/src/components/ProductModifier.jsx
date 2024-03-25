import { useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../tests/constants/components";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { fetchProducts, updateProduct } from "../redux/actions/productActions";
import { useRedirect } from "../hooks/useRedirect";

const ProductModifier = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productItemInput, setProductItemInput] = useState();

  useRedirect(["admin"])

  useEffect(() => {
    dispatch(fetchProducts());
    setProductItemInput(products.find((product) => product.id === productId));
  }, []);

  const {
    containerId: { form },
    textId: { id },
    inputId: { name, price, description },
    clickId: { submit, cancel },
  } = dataTestIds;

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductItemInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        ...productItemInput,
        price: Number(productItemInput.price),
      })
    );
    navigate(-1);
  });

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    navigate(-1);
  });

  return (
    productItemInput && (
      <div data-testid={form}>
        <form>
          <p>
            <label htmlFor="name">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              data-testid={id}
              value={productId}
              disabled
            />
          </p>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              data-testid={name}
              value={productItemInput.name}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              data-testid={price}
              value={productItemInput.price}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              data-testid={description}
              value={productItemInput.description}
              onChange={handleInputChange}
            />
          </p>
          <button data-testid={submit} onClick={handleSubmit}>
            Submit
          </button>
          <button data-testid={cancel} onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default ProductModifier;
