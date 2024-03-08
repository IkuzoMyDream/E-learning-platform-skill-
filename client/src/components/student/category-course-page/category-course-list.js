import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config";

export default function CategoryCourseList({ courses }) {
  console.log(courses);
  return (
    <Container>
      <Row>
        {courses &&
          courses.map((course) => (
            <Col lg="3" key={course.id} className="mb-3">
              <Link to={`/course/${course.name}`}>
                <Card key={course.id}>
                  <Card.Img
                    src={
                      config.serverAdminUrlPrefix +
                      course.picture.data[0].attributes.url
                    }
                    style={{ maxHeight: "150px" }}
                  />
                  <Card.Body>{course.name}</Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
