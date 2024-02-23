import { Container, Col, Row } from "react-bootstrap";
import "./menu-bar-footer.css";

export default function MenuBarFooter() {
  return (
    <div className="main-footer">
      <Container>
        <Row>
          <Col>
            สงวนลิขสิทธิ์ &copy; {new Date().getFullYear()}{" "}
            สถาบันสกิลพลัสพลัสจำกัดมหาชน
          </Col>
        </Row>
      </Container>
    </div>
  );
}
