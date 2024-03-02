import { Container, Col, Row } from "react-bootstrap";
import "./menu-bar-footer.css";
import { CiLocationOn, CiMail, CiMobile3 } from "react-icons/ci";
export default function MenuBarFooter() {
  return (
  <>
  <div className="footer-contrack">
    <div class="container p-4">
    <div class="row">
      <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase">About US</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
          molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
          voluptatem veniam, est atque cumque eum delectus sint!
        </p>
      </div>
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
      <Container>
      <h5 class="text-uppercase fw-bold mb-4">Contact</h5>
      <p> <CiLocationOn /> New York, NY 10012, US</p>
      <p> <CiMail /> info@example.com </p>
      <p> <CiMobile3 /> + 99 234 567 88</p>
      </Container>
      </div>
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h6 class="text-uppercase">Links</h6>

        <ul class="list-unstyled mb-0">
          <li>
            <a href="#!" class="text-black">Link 1</a>
          </li>
          <li>
            <a href="#!" class="text-black">Link 2</a>
          </li>
          <li>
            <a href="#!" class="text-black">Link 3</a>
          </li>
          <li>
            <a href="#!" class="text-black">Link 4</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
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
  </>
  );
}
