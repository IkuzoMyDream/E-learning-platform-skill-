import { Container, Col, Row } from "react-bootstrap";
import "./menu-bar-footer.css";
import { CiLocationOn, CiMail, CiMobile3 } from "react-icons/ci";

export default function MenuBarFooter() {
  return (
  <>
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
    <div className="footer-contrack">
    <Container>
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p> <CiLocationOn /> New York, NY 10012, US</p>
          <p> <CiMail /> info@example.com </p>
          <p> <CiMobile3 /> + 99 234 567 88</p>
          <p> <CiMobile3 /> + 01 234 567 89</p>
        </div>
    </Container>
  </div>
  </>
  );
}
