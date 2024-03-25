import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { dataTestIds } from "../../tests/constants/components";
import { capitalize } from "../../helpers/capitalize";
import { login, register } from "../../redux/actions/authActions";

import { useRedirect } from "../../hooks/useRedirect";
import { addNotification } from "../../redux/actions/notificationActions";

const AuthForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const {
    containerId: { form },
    inputId: { name, email, password, passwordConfirmation },
    clickId: { submit },
  } = dataTestIds;

  useRedirect(["guest"]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleLoginSubmit = useCallback(async (e) => {
    e.preventDefault();
    const loginInput = (({ email, password }) => ({
      email,
      password,
    }))(inputs);
    const res = await dispatch(login(loginInput));
    if (res) {
      navigate("/");
    } else {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid email or password",
        })
      );
    }
  });

  const handleRegisterSubmit = useCallback(async (e) => {
    e.preventDefault();
    const res = await dispatch(register(inputs));
    if (res) {
      navigate("/");
    } else {
      dispatch(
        addNotification({
          stateType: "auth",
          status: "error",
          message: "Invalid email or password",
        })
      );
    }
  });

  return (
    <div data-testid={form}>
      <h1>{capitalize(path)}</h1>
      <form
        onSubmit={
          path === "register" ? handleRegisterSubmit : handleLoginSubmit
        }
      >
        {path === "register" && (
          <p>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" data-testid={name} onChange={handleInputChange} />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" data-testid={email} onChange={handleInputChange} />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" data-testid={password} onChange={handleInputChange} />
        </p>
        {path === "register" && (
          <p>
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" name="passwordConfirmation" id="passwordConfirmation" data-testid={passwordConfirmation}
              onChange={handleInputChange}
            />
          </p>
        )}
        <p>
          <input type="submit" value={capitalize(path)} data-testid={submit} />
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
