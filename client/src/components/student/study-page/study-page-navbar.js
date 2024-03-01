import { useContext, useState } from "react";
import {
  Container,
  Image,
  Navbar,
  Nav,
  Offcanvas,
  ProgressBar,
  Dropdown,
  Accordion,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../utils/auth/Auth.context";


export default function StudyPageNavbar({ state, setIsMaterialOffcanvasOpen }) {
  const { state: ContextState, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      {ContextState.isLoggedIn && (
        <Navbar key={false} expand={false} style={{ background: "#A0BFE0" }}>
          <Container fluid>
            <Navbar.Brand>
              <Image src="/logo-skillpp.png" style={{ maxHeight: "60px" }} />
            </Navbar.Brand>
            <Navbar.Toggle
              onClick={() =>
                setIsMaterialOffcanvasOpen((prevState) => !prevState)
              }
              aria-controls={`offcanvasNavbar-expand-${false}`}
            />
          </Container>
        </Navbar>
      )}
    </>
  );
}
