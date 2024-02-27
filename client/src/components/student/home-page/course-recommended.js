import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, Col, Container, Row } from "react-bootstrap";

export default function CourseRecommended({ courses }) {
  if (courses.length) {
    const recommendedCourses = courses.sort(
      (a, b) => a.enrollers.data.length - b.enrollers.data.length
    );

    return (
      <Container>
        <h1 className="text-center">รายวิชาแนะนำ</h1>
        <Row>
          {courses &&
            recommendedCourses.map((course) => (
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
