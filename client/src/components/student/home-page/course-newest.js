import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CourseNewest({ courses }) {
  const [newestCourses, setNewestCourses] = useState([]);

  useEffect(() => {
    setNewestCourses(
      [...courses]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 8)
    );
  }, [courses]);

  if (newestCourses.length) {
    return (
      <Container className="my-5">
        <h1 className="text-center">รายวิชาล่าสุด</h1>
        <Row className="my-5">
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
