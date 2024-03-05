import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import styles from "./courses-card.module.css";

export default function CourseList({
  courses,
  search,
  filteredCourses,
  setFilteredCourses,
  selectedCategoriesId,
  categories,
  setSelectedCategoriesId,
  currentCourses,
}) {
  const handleCheckboxChange = (courseId) => {
    setSelectedCategoriesId((prevSelectedCoursesId) => {
      if (prevSelectedCoursesId.includes(courseId)) {
        return prevSelectedCoursesId.filter((id) => id !== courseId);
      } else {
        return [...prevSelectedCoursesId, courseId];
      }
    });
  };

  useEffect(() => {
    if (selectedCategoriesId.length === 0) {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      const filtered = courses.filter((course) =>
        course.categories.data.some((category) =>
          selectedCategoriesId.includes(category.id)
        )
      );
      const searched = filtered.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(searched);
    }
  }, [selectedCategoriesId, search, courses, setFilteredCourses]);

  useEffect(() => {}, [categories]);
  return (
    <Container>
      <>
        <Row>
          <Col lg="3">
            <Card>
              <Card.Header>หมวดหมู่</Card.Header>
              <Card.Body>
                <Form>
                  {categories.map((category) => (
                    <>
                      <Form.Check
                        onChange={() => handleCheckboxChange(category.id)}
                        className="my-3"
                        label={
                          category.name +
                          " (" +
                          category.courses.data.length +
                          ")"
                        }
                      />
                    </>
                  ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              {courses && filteredCourses.length !== 0 ? (
                filteredCourses.map((course) => (
                  <Col className="my-3" lg="4" sm="4" key={course.id}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/course/${course.name}`}
                    >
                      <Card className={styles.courses_card} key={course.id}>
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
                ))
              ) : (
                <>not found</>
              )}
            </Row>
          </Col>
        </Row>
      </>
    </Container>
  );
}
