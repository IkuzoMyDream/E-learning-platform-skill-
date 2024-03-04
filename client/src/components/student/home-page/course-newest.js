import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./home-card.module.css";

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
              <Col lg="3" key={course.id} className="my-3">
                <Link
                  to={`/course/${course.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card className={styles.home_card} key={course.id}>
                    <Card.Img
                      src={
                        "http://localhost:1337" +
                        course.picture.data[0].attributes.url
                      }
                      style={{ maxHeight: "150px" }}
                    />
                    <Card.Body>
                      <Card.Subtitle style={{ color: "#3BB3B" }} as="h4">
                        {course.name}
                      </Card.Subtitle>
                      <br></br>
                      <Card.Text>
                        {course.name_teacher
                          ? course.name_teacher
                          : "นายสมมติ สมมติ"}
                      </Card.Text>
                      <Card.Img
                        src="/logo-skillpp.png"
                        style={{ maxHeight: "50px", maxWidth: "50px" }}
                      />
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
