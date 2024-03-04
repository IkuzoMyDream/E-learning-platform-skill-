import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";

export default function CoursesPageHeader({
  courses,
  setCourses,
  setSearch,
  handleSearch,
}) {
  return (
    <Container className="my-5">
      <Form className="text-center mx-5">
        <Form.Label as="h1">รายวิชาทั้งหมด</Form.Label>
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="ค้นหารายวิชา"
        />
      </Form>
    </Container>
  );
}
