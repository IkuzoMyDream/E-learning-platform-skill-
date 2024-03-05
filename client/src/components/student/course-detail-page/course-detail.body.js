import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Accordion } from "react-bootstrap";

import { useParams, useNavigate } from "react-router-dom";

import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";

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
        <Card style={{height:"800px",}}>
          <Card.Body>
            <Row className="my-3">
              <Col>
                <h1>เกี่ยวกับ</h1>
                <p>{course.description}</p>
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
              <Col>
                <div className="my-3">
                  <h3>{course.price} ฿</h3>
                  {state.isLoggedIn && isPurchased ? (
                    <Button
                      style={{ width: "100%" }}
                      variant="secondary"
                      onClick={() => navigate(`/course/${courseName}/study`)}
                    >
                      เข้าเรียนต่อ
                    </Button>
                  ) : isCarted ? (
                    <Button
                      style={{ width: "100%" }}
                      variant="secondary"
                      onClick={() => navigate("/cart")}
                    >
                      <span>ชำระเงิน</span>
                    </Button>
                  ) : (
                    <Button style={{ width: "100%" }} onClick={handleAddCart}>
                      เพิ่มลงตะกร้า
                    </Button>
                  )}
                </div>
                <div>
                  <h1>หมวดหมู่</h1>
                  {categories?.map((category) => (
                    <p>-{category.name}</p>
                  ))}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
