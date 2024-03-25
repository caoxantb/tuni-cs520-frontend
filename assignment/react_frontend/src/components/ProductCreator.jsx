import { useState, useCallback } from "react";
import { dataTestIds } from "../tests/constants/components";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/actions/productActions";

const ProductCreator = (props) => {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { setProductCreatorVisible } = props;
  const dispatch = useDispatch();
  const {
    containerId: { form },
    inputId: { name, price, description },
    clickId: { submit, cancel },
  } = dataTestIds;

  const submitHandler = useCallback((e) => {
    e.preventDefault();
    dispatch(createProduct({ ...inputs, price: Number(inputs.price) }));
    setProductCreatorVisible(false);
  });

  const cancelHandler = useCallback((e) => {
    e.preventDefault();
    setProductCreatorVisible(false);
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  return (
    <div data-testid={form}>
      <form>
        <p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            data-testid={name}
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
            onChange={handleInputChange}
          />
        </p>
        <button data-testid={submit} onClick={submitHandler}>
          Submit
        </button>
        <button data-testid={cancel} onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductCreator;
