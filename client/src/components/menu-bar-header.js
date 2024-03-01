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
import { useContext, useState } from "react";
import { AuthContext } from "../utils/auth/Auth.context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ax from "../utils/config/ax";
import conf from "../utils/config/main";
import { useLocation } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

export default function MenuBarHeader() {
  const { state: ContextState, login, logout } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [searchCourse, setSearchCourse] = useState("");

  let { pathname } = useLocation();
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

  const onBrandClick = () => {
    navigate("/");
  };

  if (pathname !== "study") {
    return (
      <>
        {!ContextState.isLoggedIn && (
          <Navbar
            style={{
              borderBottom: "1px solid #eee",
              background: "#A0BFE0",
              // background:
              //   "linear-gradient(to right, #A0BFE0, #B8B2E1, #FFD2D2)",
            }}
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
                    style={{ backgroundColor: "#C8FFE0" }}
                  >
                    Login
                  </Button>
                </Form>
              </>
            </Container>
          </Navbar>
        )}

        <Navbar
          style={{
            borderBottom: "2px solid #4A55A2",
            background: "#A0BFE0",

            // background: "linear-gradient(to right, #A0BFE0, #B8B2E1, #FFD2D2)",
            opacity: "0.9",
          }}
        >
          <Container>
            <Navbar.Brand onClick={onBrandClick}>
              <Image src="/logo-skillpp.png" style={{ maxHeight: "60px" }} />
            </Navbar.Brand>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="ค้นหารายวิชา"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearchCourse(e.target.value)}
                />
                <Button
                  onClick={() => navigate(`/course/${searchCourse}`)}
                  variant="outline-success"
                >
                  Search
                </Button>
              </Form>
              {ContextState.isLoggedIn && (
                <Nav.Link onClick={() => navigate("/cart")}>
                  <BsCart3 />
                </Nav.Link>
              )}

              <Nav.Link onClick={() => navigate("/course")}>รายวิชา</Nav.Link>

              {ContextState.isLoggedIn && (
                <Dropdown
                  variant="inherit"
                  style={{ zIndex: "1000 !important" }}
                >
                  <Dropdown.Toggle
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

                  <Dropdown.Menu style={{ zIndex: "1000 !important" }}>
                    <Dropdown.Item href="" onClick={() => navigate("/profile")}>
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
      </>
    );
  }
}
