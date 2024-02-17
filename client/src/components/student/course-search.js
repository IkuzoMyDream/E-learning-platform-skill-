import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function CourseSearch() {
  const [course, setCourse] = useState("");

  const searchCourse = async (e) => {
    e.preventDefault();
    console.log(course);
  };
  return (
    <Container>
      <Form onSubmit={searchCourse}>
        <Form.Control
          type="text"
          placeholder="ค้นหารายวิชา"
          onChange={(e) => setCourse(e.target.value)}
        ></Form.Control>
        <Button type="submit">ค้นหา</Button>
      </Form>
    </Container>
  );
}
