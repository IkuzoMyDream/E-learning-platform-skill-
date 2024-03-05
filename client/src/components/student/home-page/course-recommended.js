import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";

import styles from "./home-card.module.css";

export default function CourseRecommended({ courses }) {
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    setRecommendedCourses(
      [...courses]
        .sort((a, b) => b.enrollers.data.length - a.enrollers.data.length)
        .slice(0, 4)
    );
  }, [courses]);

  if (recommendedCourses.length) {
    return (
      <Container className="my-5">
        <h1 className="text-center">รายวิชาแนะนำ</h1>
        <Row className="my-5">
          {courses &&
            recommendedCourses.map((course) => (
<<<<<<< HEAD
              <Col lg="3" key={course.id} className="mb-3">
=======
              <Col lg="3" key={course.id} className="mb - 3">
>>>>>>> 4c6dd1039b1a4bb1e8f91b9aee7515a732e26fb2
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
                      <Card.Text>{course.name_teacher}</Card.Text>
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
// test
