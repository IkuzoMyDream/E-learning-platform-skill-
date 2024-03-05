import { Card, Col, Container, Row } from "react-bootstrap";

export default function AdminFunction() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>จำนวนสมาชิก</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>รายได้</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>จำนวนชั่วโมงใช้งาน</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
