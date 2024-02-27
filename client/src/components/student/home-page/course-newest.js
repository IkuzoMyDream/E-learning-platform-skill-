import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CourseNewest({ courses }) {
  if (courses.length) {
    const newestCourses = courses.sort(
      (a, b) => new Date(a.publishAt) - new Date(b.publishAt)
    );
    console.log(newestCourses);
    return (
      <Container>
        <h1 className="text-center">รายวิชาล่าสุด</h1>
        <Row>
          {courses &&
            newestCourses.map((course) => (
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
        </Row>
      </Container>
    );
  }
}
