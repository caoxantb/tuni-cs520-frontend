/** @format
 * Student instructions:
 * Use the given template with props to create a AuthUser component similar to the AuthUser component in the Vue exercise. Instead of using a template, use JSX.
 *
 * isLoggedIn is a prop boolean that indicates if the user is logged in or not.
 * onLogin is a prop function that will be called when the form is submitted and user is in "login" view. It should be called with the username and password as arguments.
 * onRegister is a prop function that will be called when the form is submitted and user is in the "register" view. It should be called with the username and password as arguments.
 * onLogout is a prop function that will be called when the logout link is clicked. It should be called with no arguments.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests.
 */
import { useState, useEffect } from "react";

export const AuthUser = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [loginState, setLoginState] = useState(isLoggedIn || false);
  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoginState(isLoggedIn || false);
  }, [isLoggedIn]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    displayLogin ? onLogin(username, password) : onRegister(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div>
        <a
          role="link"
          onClick={() => {
            loginState ? onLogout() : setDisplayLogin(!displayLogin);
          }}
        >
          {loginState
            ? "Logout"
            : displayLogin
            ? "Go to register"
            : "Go to login"}
        </a>
      </div>

      {!loginState && (
        <form id="auth-form" onSubmit={formSubmitHandler}>
          <input
            type="text"
            id="username"
            name="auth-username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="auth-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn-auth" type="submit">
            {displayLogin ? "Login" : "Register"}
          </button>
        </form>
      )}
    </>
  );
};
