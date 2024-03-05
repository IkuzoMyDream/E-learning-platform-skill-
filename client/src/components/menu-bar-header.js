import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  Image,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/auth/Auth.context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ax from "../utils/config/ax";
import conf from "../utils/config/main";
import { useLocation } from "react-router-dom";

import "./menu-bar.header.css";

const initialState = {
  username: "",
  password: "",
};

export default function MenuBarHeader() {
  const { state: ContextState, login, logout } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [searchCourse, setSearchCourse] = useState("");

  let { pathname } = useLocation();
  const isAdminPath = pathname.slice(1, 6) === "admin";
  pathname = pathname.slice(-5);

  const navigate = useNavigate();

  const onSearchCourse = async () => {
    try {
      const response = await ax.get(`${conf.getSearchcourse}${searchCourse}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/course/${searchCourse}`);
  };

  const onBrandClick = () => {
    navigate("/");
  };

  if (pathname !== "study" && !isAdminPath) {
    return (
      <div style={{ position: "flex" }}>
        {!ContextState.isLoggedIn && (
          <div>
            <Navbar
              style={{
                borderBottom: "1px solid rgb(60, 71, 82)",
                background: "#A0BFE0",
                width: "100%",
              }}
              expand="lg"
              className="z-3 position-fixed"
            >
              <Container>
                <Navbar.Brand></Navbar.Brand>
                <>
                  <Form className="d-flex" onSubmit={onSubmit}>
                    <Form.Control
                      type="email"
                      placeholder="username"
                      className="me-2"
                      aria-label="username"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          username: e.target.value,
                        }))
                      }
                      value={state.username}
                    />
                    <Form.Control
                      type="password"
                      placeholder="password"
                      className="me-2"
                      aria-label="password"
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: e.target.value,
                        }))
                      }
                    />
                    <Button
                      variant="outline-success"
                      type="submit"
                      style={{ backgroundColor: "#BDD2B6" }}
                    >
                      Login
                    </Button>
                  </Form>
                </>
              </Container>
            </Navbar>
          </div>
        )}
        <div>
          <Navbar
            style={{
              borderBottom: "1px solid rgb(60, 71, 82)",
              background: "#A0BFE0",
              marginBottom: "100px",
              width: "100%",
              marginTop: !ContextState.isLoggedIn ? "54.4px" : "0",
            }}
            expand="lg"
            className="z-3 position-fixed"
          >
            <Container>
              <Navbar.Brand onClick={onBrandClick}>
                <Link to="/">
                  <Image
                    src="/logo-skillpp.png"
                    style={{ maxHeight: "60px" }}
                  />
                </Link>
              </Navbar.Brand>
              <Nav>
                <form
                  className="form d-flex"
                  onSubmit={handleSearch}
                  style={{ border: "0.1px solid blue" }}
                >
                  <button type="submit">
                    <svg
                      width="17"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-labelledby="search"
                    >
                      <path
                        d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                        stroke="currentColor"
                        strokeWidth="1.333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <input
                    className="input me-2"
                    placeholder="ค้นหารายวิชา"
                    aria-label="Search"
                    type="search"
                    onChange={(e) => setSearchCourse(e.target.value)}
                  />
                  <button className="reset" type="reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </form>
                {ContextState.isLoggedIn && (
                  <Nav.Link onClick={() => navigate("/cart")}>
                    <BsCart3 />
                  </Nav.Link>
                )}

                <Nav.Link onClick={() => navigate("/course")}>รายวิชา</Nav.Link>

                {ContextState.isLoggedIn && (
                  <Dropdown variant="inherit" className="z-3">
                    <Dropdown.Toggle
                      className="z-3"
                      variant="inherit"
                      style={{
                        color: "black",
                        border: "none",
                      }}
                    >
                      {ContextState.user.username}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-2"
                      >
                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                        <circle cx="12" cy="10" r="3" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        href=""
                        className="dropdown-item"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="" onClick={logout}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </div>
    );
  }
}
