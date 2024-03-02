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
import ModalCart from "./modal-cart";
import ModalOnpurchase from "./modal-onpurchase";
import ModalPurchaseFinished from "./modal-purchase-finished";

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
          await ax.put(`/course/${course.id}/enroll`);
          await ax.post(`/payments`, {
            data: { owner: state.user.id, course: course.id },
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
    console.log(selectedCourses);
    setTotalPrice(selectedCourses?.reduce((a, b) => a + b.price, 0));
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
          <ModalCart
            setTransactionState={setTransactionState}
            setCurrentTransactionState={setCurrentTransactionState}
            totalPrice={totalPrice}
            selectedCourses={selectedCourses}
            currentTransactionState={currentTransactionState}
          />
        )}
        {currentTransactionState === 2 && (
          <ModalOnpurchase
            enrollCourse={enrollCourse}
            setCurrentTransactionState={setCurrentTransactionState}
            setTransactionState={setTransactionState}
            currentTransactionState={currentTransactionState}
          />
        )}
        {currentTransactionState === 3 && (
          <ModalPurchaseFinished
            setIsShowTransactionModal={setIsShowTransactionModal}
          />
        )}
      </Modal>
    </Container>
  );
}
