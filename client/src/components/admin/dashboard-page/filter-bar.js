import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";

export default function FilterBar({
  courses,
  setSearch,
  filterSort,
  setFilterSort,
}) {
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <Form className="text-center mx-5">
            {/* <Form.Label as="h1">รายวิชาทั้งหมด</Form.Label> */}

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="ค้นหารายวิชา"
            />
          </Form>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle>{filterSort}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilterSort("คอร์สขายดี")}>
                คอร์สขายดี
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterSort("ล่าสุด")}>
                ล่าสุด
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterSort("เก่าสุด")}>
                เก่าสุด
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setFilterSort("จำนวนชั่วโมงเรียนของผู้ใช้งาน")}
              >
                จำนวนชั่วโมงเรียนของผู้ใช้งาน
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}
