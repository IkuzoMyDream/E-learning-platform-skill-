import React, { useState, useContext } from "react";

import { AuthContext } from "../../utils/auth/Auth.context";
import { Route } from "react-router-dom";
import './adminform.css'
import DashBoardPage from "../../pages/admin/DashBoardPage"

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
    <div className="black-container">
      <form className="AdminForm" name="loginForm" onSubmit={onSubmit}>
        <p className="form-title">Admin Login</p>
        <div className="input-container">
          <input
            type="text"
            name="username"
            className="form-control"
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

        <div className="input-container">
          <input
            type="password"
            name="password"
            className="form-control"
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

        <div className="input-container">
          <button type="submit" className="submit">
            Login
          </button>
        </div>

        {isLoginPending && <div>Please enter to login</div>}
        {isLoggedIn && <div>Success.</div> && <DashBoardPage />}
        {loginError && <div>{loginError.message}</div>}
      </form>
    </div>
  );
}


export default AdminLoginPage;
