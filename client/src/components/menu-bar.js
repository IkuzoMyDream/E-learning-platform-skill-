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
import { useContext, useState } from "react";
import { AuthContext } from "../utils/auth/Auth.context";
import { Outlet } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

export default function MenuBar() {
  const { state: ContextState, login, logout } = useContext(AuthContext);
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
    <>
      {!ContextState.isLoggedIn && (
        <Navbar style={{ borderBottom: "1px solid #000" }}>
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
                <Button variant="outline-success" type="submit">
                  Login
                </Button>
              </Form>
            </>
          </Container>
        </Navbar>
      )}

      <Navbar style={{ borderBottom: "1px solid #000" }}>
        <Container>
          <Navbar.Brand>
            <Image src="/logo-skillpp.png" style={{ maxHeight: "60px" }} />
          </Navbar.Brand>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="ค้นหารายวิชา"
                className="me-2"
                aria-label="Search"
                
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Profile</Nav.Link>
            {ContextState.isLoggedIn && (
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                  }}
                >
                  {ContextState.user.username}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="#212b36"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    className="mx-2"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M3,21 h18 C 21,12 3,12 3,21" />
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="">Profile</Dropdown.Item>
                  <Dropdown.Item href="">My Course</Dropdown.Item>
                  <Dropdown.Item href="" onClick={logout}>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
