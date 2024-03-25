import { useParams, useNavigate } from "react-router-dom";
import { dataTestIds } from "../tests/constants/components";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { useRedirect } from "../hooks/useRedirect";
import { fetchUsers, updateUser } from "../redux/actions/userActions";

const UserModifier = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    dispatch(fetchUsers());
    setUserInput(users.find((user) => user.id === userId));
  }, []);

  const {
    containerId: { form },
    inputId: { name },
    selectId: { role },
    clickId: { submit, cancel },
  } = dataTestIds;

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(updateUser(userId, userInput));
    navigate(-1);
  });

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    navigate(-1);
  });

  return (
    userInput && (
      <div data-testid={form}>
        <form>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              data-testid={name}
              value={userInput.name}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              value={userInput.role}
              onChange={handleInputChange}
              data-testid={role}
            >
              <option value="admin">
                admin
              </option>
              <option value="customer">
                customer
              </option>
            </select>
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

export default UserModifier;