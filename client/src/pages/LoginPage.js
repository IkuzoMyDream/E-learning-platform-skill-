import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../utils/auth/Auth.context.js";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Csssignin.css";

const initialState = {
  username: "",
  password: "",
};

function LoginPage() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    login(username, password);
    setState(initialState);
    if (isLoggedIn) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (ContextState.isLoggedIn) {
      navigate("/");
    }
  }, [ContextState]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column align-items-center">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="email"
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
        </div>
      </form>
    </Container>
  );
}

export default LoginPage;
