import {
  Offcanvas,
  Accordion,
  ProgressBar,
  Dropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  BsCheck,
  BsImage,
  BsList,
  BsPersonVideo,
  BsUpload,
} from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { useEffect, useState } from "react";

import { BsChatRight } from "react-icons/bs";

// import "./accordion.css";

export default function StudyMaterialsOffcanvas({
  state: ContextState,
  setSelectedMaterial,
  logout,
  chapters,
  isDesktopOrLaptop,
  isMaterialOffcanvasOpen,
  setIsMaterialOffcanvasOpen,
}) {
  const [courseProgress, setCourseProgress] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const navigate = useNavigate();
  const { courseName } = useParams();

  useEffect(() => {
    // console.log(chapters);
    setCourseProgress(
      chapters.reduce((acc, chapter) => acc + chapter.duration, 0)
    );
    setUserProgress(
      chapters.reduce(
        (total, item) =>
          total +
          item.material.reduce(
            (acc, materialItem) =>
              acc +
              (materialItem.progress *
                materialItem.material.attributes.duration) /
                100,
            0
          ),
        0
      )
    );
  }, [chapters]);

  useEffect(() => {
    // console.log(userProgress, courseProgress);
  }, [courseProgress, userProgress]);

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
            <div className="text-center my-3">
              <Row className="my-3">
                <Col>ความคืบหน้า</Col>
                <Col>
                  {courseName} (
                  {Math.round((userProgress / courseProgress) * 100)} %)
                </Col>
              </Row>
              {/* <Row className="my-3"> */}
              <ProgressBar
                now={Math.round((userProgress / courseProgress) * 100)}
              />
              {/* </Row> */}
            </div>

            <Accordion>
              {chapters.map((chapter) => (
                <Accordion.Item key={chapter.id} eventKey={chapter.chapter - 1}>
                  <Accordion.Header>
                    บทที่ {chapter.chapter} : {chapter.title}
                    <br />
                    {chapter.material?.reduce(
                      (userProgress, material) =>
                        userProgress + material.material.attributes.duration,
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
                          // console.log(material);
                        }}
                      >
                        {material.progress === 100 && <BsCheck />}
                        <Link>
                          {chapter.chapter}.
                          {material.material.attributes.subchapter}{" "}
                          {material?.material?.attributes?.title}
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
