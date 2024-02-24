import { Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";


export default function TrolleyList({ courses }) {
  console.log(courses);
  return (
    <Container>
      <h1>ตะกร้า</h1>
      <Row>
        {courses &&
          courses.map((course) => (
            <Col lg="3" key={course.id}>
              
              <Link to={`/course/${course.name}`}>
                <Card key={course.id}>
                  <Card.Img
                    src={
                      "http://localhost:1337" +
                      course.picture.data[0].attributes.url
                    }
                    style={{ maxHeight: "150px" }}
                  />
                  <Card.Body>{course.name}</Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
          <h1>test</h1>
      </Row>
      
    </Container>
  );
}
