import { useState } from "react";
import { Container, ProgressBar, Button, Row, Col } from "react-bootstrap";

export default function CartProgressBar() {
  const [currentTransactionState, setCurrentTransactionState] = useState(1);

  const [transactionState, setTransactionState] = useState({
    1: { now: 33, active: true, disabled: false },
    2: { now: 66, active: false, disabled: true },
    3: { now: 100, active: false, disabled: true },
  });

  return (
    <Container>
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
    </Container>
  );
}
