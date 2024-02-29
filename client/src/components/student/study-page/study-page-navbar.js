import { useContext } from "react";
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

export default function StudyPageNavbar({ chapters, setSelectedMaterial }) {
  const { state: ContextState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (chapters) {
    return (
      <>
        {ContextState.isLoggedIn && (
          <Navbar key={false} expand={false} style={{ background: "#A0BFE0" }}>
            <Container fluid>
              <Navbar.Brand>
                <Image src="/logo-skillpp.png" style={{ maxHeight: "60px" }} />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${false}`}
              />
              <Navbar.Offcanvas
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="end"
                show={true}
                backdrop={false}
              >
                <Offcanvas.Header>
                  <Offcanvas.Title>
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
                        <Dropdown.Item
                          href=""
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="" onClick={logout}>
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ProgressBar now="49" />

                  <Accordion>
                    {chapters.map((chapter) => (
                      <Accordion.Item
                        key={chapter.id}
                        eventKey={chapter.chapter - 1}
                      >
                        <Accordion.Header>
                          บทที่ {chapter.chapter} : {chapter.title}
                          <br />
                          {chapter.material?.reduce(
                            (totalProgress, material) =>
                              totalProgress +
                              material.material.attributes.duration,
                            0
                          )}
                          นาที
                        </Accordion.Header>
                        <Accordion.Body>
                          {chapter?.material?.map((material) => (
                            <p
                              key={material.material.id}
                              onClick={() => {
                                setSelectedMaterial(material);
                              }}
                            >
                              <Link>
                                {material?.material?.attributes?.title} :
                                เรียนไปแล้ว {material.progress} %
                              </Link>
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        )}
      </>
    );
  }
}
