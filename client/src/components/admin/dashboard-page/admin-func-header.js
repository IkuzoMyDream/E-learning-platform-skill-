import { useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

export default function AdminFuncHeader({ data }) {
  useEffect(() => {
    // console.log(data);
  }, [data]);

  if (data.amountUser && data.totalEarning && data.totalProgresses) {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card bg="primary" text="white" className="text-center">
                <Card.Header as="h5">จำนวนสมาชิก</Card.Header>
                <Card.Body as="h1">{data.amountUser} คน</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="success" text="white" className="text-center">
                <Card.Header as="h5">รายได้</Card.Header>
                <Card.Body as="h1">{data.totalEarning} บาท</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="warning" text="white" className="text-center">
                <Card.Header as="h5">จำนวนชั่วโมงเรียนของผู้ใช้งาน</Card.Header>
                <Card.Body as="h1">{data.totalProgresses} ชั่วโมง</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
