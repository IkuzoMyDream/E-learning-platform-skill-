import { Container, Nav, Navbar } from "react-bootstrap";

import { useContext } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";
import { Outlet } from "react-router-dom";

export default function AdminNavbar() {
  const { state } = useContext(AuthContext);
  console.log(state);
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Nav>
            <Nav.Link>Admin</Nav.Link>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>test</Nav.Link>
            <Nav.Link>test2</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
