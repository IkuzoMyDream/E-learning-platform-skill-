import React, { useState, useContext } from "react";
import { AuthContext } from "../utils/auth/Auth.context.js";
import './Csssignin.css';

const initialState = {
  username: "",
  password: "",
};

function LoginPage() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    login(username, password);
    setState(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="form-title">Sign in to your account</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter email"
          name="username"
          onChange={handleChange}
          value={state.username}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
      </div>
      <button type="submit" className="submit">
        Sign in
      </button>
      <p className="signup-link">
        No account? <a href="">Sign up</a>
      </p>

      {isLoginPending && <div>Please wait...</div>}
      {isLoggedIn && <div>Success.</div>}
      {loginError && <div>{loginError.message}</div>}
    </form>
  );
}

export default LoginPage;