import { useContext, useEffect, useState } from "react";
import {
  Container,
  ProgressBar,
  Button,
  Row,
  Col,
  Modal,
  Image,
  Table,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";
import { AuthContext } from "../../../utils/auth/Auth.context";

export default function CartProgressBar({
  selectedCoursesId,
  selectedCourses,
  setSelectedCourses,
  isShowTransactionModal,
  setIsShowTransactionModal,
}) {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTransactionState, setCurrentTransactionState] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionState, setTransactionState] = useState({
    1: { now: 33, active: true, disabled: false },
    2: { now: 66, active: false, disabled: true },
    3: { now: 100, active: false, disabled: true },
  });

  const deleteCourseCart = async () => {
    try {
      await Promise.all(
        selectedCourses.map(async (course) => {
          await ax.delete(`${conf.deleteCartById}${course.carts[0].id}`);
        })
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const enrollCourse = async () => {
    try {
      await Promise.all(
        selectedCourses.map(async (course) => {
          await ax.put(`${conf.postEnrollWithUserId}${course.id}`, {
            data: { enrollers: state.user.id },
          });
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      deleteCourseCart();
    }
  };

  useEffect(() => {
    setTotalPrice(selectedCourses?.reduce((a, b) => a + b.price, 0));
    console.log(selectedCourses, selectedCoursesId);
  }, [selectedCourses]);

  return (
    <Container>
      <Modal
        size="lg"
        show={isShowTransactionModal}
        onHide={() => setIsShowTransactionModal(false)}
      >
        <Row className="text-center my-3">
          <Col>
            <Button
              variant="secondary"
              className="rounded-circle"
              active={transactionState[1].active}
              disabled={transactionState[1].disabled}
            >
              ตะกร้า
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="rounded-circle"
              active={transactionState[2].active}
              disabled={transactionState[2].disabled}
            >
              ชำระเงิน
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="rounded-circle"
              active={transactionState[3].active}
              disabled={transactionState[3].disabled}
            >
              เสร็จสิ้น
            </Button>
          </Col>
        </Row>
        <ProgressBar
          now={transactionState[currentTransactionState].now}
        ></ProgressBar>
        {currentTransactionState === 1 && (
          <>
            {" "}
            <Table>
              <thead>
                <tr>
                  <th id="course-thumbnail"></th>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses &&
                  selectedCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <Image
                          style={{ maxHeight: "50px", minWidth: "50px" }}
                          src={"http://localhost:1337" + course.picture[0].url}
                        />
                      </td>
                      <td>{course.name}</td>
                      <td>{course.price}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h3 className="text-center">ราคาทั้งหมด {totalPrice}</h3>
            <Button
              variant="success"
              onClick={() => {
                setCurrentTransactionState((prevState) => prevState + 1);
                setTransactionState((prevState) => ({
                  ...prevState,
                  [currentTransactionState]: {
                    now: 33,
                    active: false,
                    disabled: true,
                  },
                  [currentTransactionState + 1]: {
                    now: prevState[currentTransactionState].now + 33.33,
                    active: true,
                    disabled: false,
                  },
                }));
              }}
            >
              ชำระเงิน
            </Button>
          </>
        )}
        {currentTransactionState === 2 && (
          <>
            <Modal.Body className="text-center">
              <Image
                className="text-center"
                style={{ maxHeight: "300px", maxWidth: "300px" }}
                src="/qrtest.png"
              />
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button
                variant="success"
                onClick={async () => {
                  await enrollCourse();
                  setCurrentTransactionState((prevState) => prevState + 1);
                  setTransactionState((prevState) => ({
                    ...prevState,
                    [currentTransactionState]: {
                      now: 33,
                      active: false,
                      disabled: true,
                    },
                    [currentTransactionState + 1]: {
                      now: prevState[currentTransactionState].now + 33.33,
                      active: true,
                      disabled: false,
                    },
                  }));
                }}
              >
                ชำระเงิน
              </Button>
            </Modal.Footer>
          </>
        )}
        {currentTransactionState === 3 && (
          <>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => setIsShowTransactionModal(false)}
              >
                ปิด
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}
