import { Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function CartList({ carts }) {
  console.log(carts);
  return (
    <Container>
      <h1>ตะกร้า</h1>
      <Row>
        {carts &&
          carts.map((course) => (
            <Col lg="3" key={course.id}>
              {/* <Link to={`/course/${course.name}`}> */}
              <Card key={course.id}>
                <Card.Img
                  src={
                    "http://localhost:1337" +
                    course.picture[0].url
                  }
                  style={{ maxHeight: "150px" }}
                />
                <Card.Body>{course.name}</Card.Body>
              </Card>
              {/* </Link> */}
            </Col>
          ))}
      </Row>
    </Container>
  );
}

// nenenene
