import React, { useState, useContext } from "react";

import { AuthContext } from "../../utils/auth/Auth.context";
import { Route } from "react-router-dom";
import './adminform.css'

const initialState = {
  username: "",
  password: "",
};

function AdminLoginPage() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    console.log(username, password);
    login(username, password);
    setState({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <form className="AdminForm" name="loginForm" onSubmit={onSubmit}>
        <p id="heading">Admin Login</p>
        <div className="row">
          <div className="col-sm-3 col-md-6">
            <label htmlFor="username">email</label>
          </div>

          <div className="col-sm-9 col-md-6">
            <input
              type="text"
              name="username"
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
              value={state.username}
              placeholder="Admin Username"
            />
          </div>

          <div className="col-sm-3 col-md-6">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-sm-9 col-md-6">
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              value={state.password}
              placeholder="Password"
            />
          </div>

          <div className="col-sm-3 col-md-6"></div>
          <div className="col-sm-9 col-md-6">
            <input className="primary" type="submit" value="Login" />
          </div>
        </div>

        {isLoginPending && <div>Please wait...</div>}
        {isLoggedIn && <div>Success.</div>}
        {loginError && <div>{loginError.message}</div>}
      </form>
    </div>

  );
}

export default AdminLoginPage;
