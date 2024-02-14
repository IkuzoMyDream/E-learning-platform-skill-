import { useEffect, useState, createContext } from "react";
import conf from "../config/main";
import ax, { axData } from "../config/ax";

export const AuthContext = createContext(null);

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginPending: false,
  loginError: null,
};

const updateJwt = (jwt) => {
  axData.jwt = jwt;
  if (jwt) {
    sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
  } else {
    sessionStorage.removeItem(conf.jwtSessionStorageKey);
  }
};

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn, user) => setState({ isLoggedIn, user });
  const setLoginError = (loginError) => setState({ loginError });

  const handleLoginResult = (error, result) => {
    setLoginPending(false);

    if (result && result.user) {
      if (result.jwt) {
        updateJwt(result.jwt);
      }
      setLoginSuccess(true, result.user);
    } else if (error) {
      setLoginError(error);
    }
  };

  useEffect(() => {
    setLoginPending(true);
    loadPersistedJwt(handleLoginResult);
  }, []);

  const login = (username, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(username, password, handleLoginResult);
  };

  const logout = () => {
    setLoginPending(false);
    updateJwt(null);
    setLoginSuccess(false);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = async (username, password, callback) => {
  try {
    const response = await ax.post(conf.loginEndpoint, {
      identifier: username,
      password,
    });
    if (response.data.jwt && response.data.user.id > 0) {
      callback(null, response.data);
    } else {
      callback(new Error("Invalid username and password"));
    }
  } catch (e) {
    callback(new Error("Fail to initiate login"));
  }
};

const loadPersistedJwt = async (callback) => {
  try {
    const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
    if (persistedJwt) {
      axData.jwt = persistedJwt;
      const response = await ax.get(conf.jwtUserEndpoint);
      const role = response.data.role.name
      if (response.data.id > 0) {
        callback(null, {
          user: { ...response.data, role: role },
        });
      } else {
        callback(null);
      }
    }
  } catch (e) {
    console.log(e);
    callback(new Error("Fail to initiate auto login"));
  }
};
