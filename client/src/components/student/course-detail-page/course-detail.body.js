import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Accordion } from "react-bootstrap";
import {
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";
import "./purchaseButton.css"
import "./gotolearnbutton.css"


export default function CourseDetailBody({
  course,
  state,
  isPurchased,
  courseId,
  userId,
  setShowLoginModal,
  chapters,
  isCarted,
}) {
  const [courseHour, setCourseHour] = useState(null);
  const [categories, setCategories] = useState(null);
  const { courseName } = useParams();

  const navigate = useNavigate();

  const handleAddCart = () => {
    if (!state.isLoggedIn) {
      setShowLoginModal(true);
    } else if (!isPurchased) {
      addCourseToCart();
    }
  };

  const addCourseToCart = async () => {
    try {
      await ax.post(conf.postCart, {
        data: { course: courseId, owner: userId },
      });
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/cart");
    }
  };

  useEffect(() => {
    setCategories(
      course?.categories?.data?.map((category) => category.attributes)
    );
  }, [course]);

  useEffect(() => {
    console.log(isCarted);
  }, [isCarted]);

  return (
    <>
      {chapters && course && (
        <Card style={{ height: "450px", width: "auto", float: "center", backgroundColor: "white", }}>
          <Card.Body>
            <Row className="my-3">
              <Col>
                <Col>
                  <h1>เกี่ยวกับ</h1>
                  <p>{course.description}</p>
                </Col>
                <Col>
                  <h1>เนื้อหาในคอร์ส</h1>
                  <Accordion>
                    {chapters?.map((chapter) => (
                      <Accordion.Item
                        key={chapter.id}
                        eventKey={chapter.chapter - 1}
                      >
                        <Accordion.Header>
                          บทที่ {chapter.chapter} : {chapter.title}
                          <br />
                          {chapter.material?.reduce(
                            (userProgress, material) =>
                              userProgress +
                              material.material.attributes.duration,
                            0
                          )}
                          นาที
                        </Accordion.Header>
                        <Accordion.Body>
                          {chapter?.course_materials?.data?.map((material) => (
                            <div key={material.attributes.id}>
                              <Row>
                                <Col>
                                  &nbsp;&nbsp;{chapter.chapter}.
                                  {material.attributes?.subchapter}{" "}
                                  {material?.attributes?.title}
                                </Col>
                                <Col>{chapter.duration} วินาที</Col>
                              </Row>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Col>
              <Col>
                <Col>
                  <h3>{course.price} ฿</h3>
                </Col>
                <Col>
                  <div className="my-3">
                    {state.isLoggedIn && isPurchased ? (
                      <Button className="animated-button" onClick={() => navigate(`/course/${courseName}/study`)} style={{backgroundColor:"#596FB7",}}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                          <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                          ></path>
                        </svg>
                        <span class="text">เข้าเรียน</span>
                        <span class="circle"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                          <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                          ></path>
                        </svg>
                      </Button>
                    ) : isCarted ? (
                      <div className="purchaseButton" onClick={() => navigate("/cart")}>
                        <div class="button-wrapper">
                          <div class="text">ชำระเงิน</div>
                          <span class="icon">
                            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="purchaseButton" onClick={handleAddCart}>
                        <div class="button-wrapper">
                          <div class="text" >ใส่ตะกร้า</div>
                          <span class="icon">
                            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>

                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <h1>หมวดหมู่</h1>
                    {categories?.map((category) => (
                      <p>-{category.name}</p>
                    ))}
                    <h6><BsPersonCircle /> <span class="icon-text">{course.name_teacher}</span></h6>
                    <h6><BsFillEnvelopeAtFill /> <span class="icon-text">{course.mail_teacher}</span></h6>
                    <h6><BsFillTelephoneFill /> <span className="icon-text">{course.phone_number}</span></h6>
                  </div>
                </Col>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
