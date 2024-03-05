import { useState , useContext} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "../../../utils/auth/Auth.context";

import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";

export default function CoursesPageHeader({
  courses,
  setCourses,
  setSearch,
  handleSearch,
}) {
  const { state: ContextState} = useContext(AuthContext);
  return (
    <>
      <Container className="mb-5" >
        <Form className="text-center mx-5" >
          <Form.Label as="h1">รายวิชาทั้งหมด</Form.Label>
          <div style={{marginTop: !ContextState.isLoggedIn ? "140px" : "85px",}}></div>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="ค้นหารายวิชา"
          />
        </Form>
      </Container>
    </>
  );
}
