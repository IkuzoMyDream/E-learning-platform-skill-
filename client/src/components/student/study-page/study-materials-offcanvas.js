import {
  Offcanvas,
  Accordion,
  ProgressBar,
  Dropdown,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { BsList } from "react-icons/bs";

export default function StudyMaterialsOffcanvas({
  state: ContextState,
  setSelectedMaterial,
  logout,
  chapters,
  isDesktopOrLaptop,
  isMaterialOffcanvasOpen,
  setIsMaterialOffcanvasOpen,
}) {
  const navigate = useNavigate();

  return (
    <>
      {ContextState && chapters && (
        <Offcanvas
          show={isMaterialOffcanvasOpen}
          backdrop={!isDesktopOrLaptop}
          placement="end"
          onHide={() => setIsMaterialOffcanvasOpen(false)}
          scroll={true}
        >
          <Offcanvas.Header>
            <Offcanvas.Title>
              <div
                style={{
                  width: "370px",
                  justifyContent: "right",
                  display: "flex",
                }}
              >
                {!isDesktopOrLaptop && (
                  <>
                    <Button
                      onClick={() =>
                        setIsMaterialOffcanvasOpen((prevState) => !prevState)
                      }
                      variant=""
                      width="100px"
                    >
                      <BsList width="100px" />
                    </Button>
                  </>
                )}
              </div>

              <Dropdown variant="inherit" style={{ zIndex: "1000 !important" }}>
                <Dropdown.Toggle
                  variant="inherit"
                  style={{
                    color: "black",
                    border: "none",
                  }}
                >
                  {ContextState?.user?.username}
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
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ProgressBar now="49" />
            <Accordion>
              {chapters.map((chapter) => (
                <Accordion.Item key={chapter.id} eventKey={chapter.chapter - 1}>
                  <Accordion.Header>
                    บทที่ {chapter.chapter} : {chapter.title}
                    <br />
                    {chapter.material?.reduce(
                      (totalProgress, material) =>
                        totalProgress + material.material.attributes.duration,
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
                          console.log(material);
                        }}
                      >
                        <Link>
                          {material?.material?.attributes?.title} : เรียนไปแล้ว{" "}
                          {material.progress} %
                        </Link>
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
}
