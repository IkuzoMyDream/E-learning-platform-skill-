import { Container, Col, Row } from "react-bootstrap";
import "./menu-bar-footer.css";
import { CiLocationOn, CiMail, CiMobile3 } from "react-icons/ci";
import { useLocation } from "react-router-dom";
/*
<h6 className="text-uppercase">Links</h6>

<ul className="list-unstyled mb-0">
  <li>
    <a href="#!" className="text-black">
      Link 1
    </a>
  </li>
  <li>
    <a href="#!" className="text-black">
      Link 2
    </a>
  </li>
  <li>
    <a href="#!" className="text-black">
      Link 3
    </a>
  </li>
  <li>
    <a href="#!" className="text-black">
      Link 4
    </a>
  </li>
</ul>
*/
export default function MenuBarFooter() {
  let { pathname } = useLocation();
  pathname = pathname.slice(-5);
  const isPathIsLogin = pathname.slice(0,5) === "login"

  if (pathname !== "study" && !isPathIsLogin) {
    return (
      <>
        <div className="footer-contrack">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">About US</h5>
                <p>
                เว็บ skill++ เป็นแพลตฟอร์มที่ให้บริการการเรียนรู้ที่ยืดหยุ่นและสะดวกสบาย 
                ผู้เรียนสามารถเลือกเรียนจากหลากหลายวิชาการ และสามารถเรียนได้ตามรอบเวลาที่สะดวก 
                ระบบการสอนออนไลน์ทำให้การเรียนรู้เป็นไปอย่างรวดเร็วและมีประสิทธิภาพมากยิ่งขึ้น 
                บริการที่ยอดเยี่ยมนี้ช่วยให้ผู้เรียนได้รับความรู้และทักษะที่ต้องการในสถานที่และเวลาที่สะดวกสบายสำหรับคุณ
                </p>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <Container>
                  <h5 className="text-uppercase fw-bold mb-4">Contact</h5>
                  <p>
                    {" "}
                    <CiLocationOn /> New York, NY 10012, US
                  </p>
                  <p>
                    {" "}
                    <CiMail /> info@example.com{" "}
                  </p>
                  <p>
                    {" "}
                    <CiMobile3 /> + 99 234 567 88
                  </p>
                </Container>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" class="w-100" />
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
}
