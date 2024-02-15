import { Container, Nav, Navbar } from "react-bootstrap";

import { useContext } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";
import { Outlet } from "react-router-dom";

export default function StudentNavbar() {
  const { state } = useContext(AuthContext);
  console.log(state);
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Nav>
            <Nav.Link>Student</Nav.Link>
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
