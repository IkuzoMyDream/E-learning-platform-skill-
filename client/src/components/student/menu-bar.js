import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";
import { Outlet } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

export default function MenuBar() {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  const [state, setState] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    console.log(username, password)
    login(username, password);
    setState({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar style={{ borderBottom: "1px solid #000" }}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          {ContextState.isLoggedIn && (
            <>
              <Nav.Item>{ContextState.user.firstname}</Nav.Item>
              <Nav.Item>{ContextState.user.lastname}</Nav.Item>
            </>
          )}

          {!ContextState.isLoggedIn && (
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
                <Button variant="outline-success" type="submit">Login</Button>
              </Form>
            </>
          )}
        </Container>
      </Navbar>
      <Navbar style={{ borderBottom: "1px solid #000" }}>
        <Container>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Nav>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
