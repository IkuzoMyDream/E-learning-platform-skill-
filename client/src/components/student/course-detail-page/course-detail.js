import { Col, Row, Image, Container } from "react-bootstrap";
import {
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import TransactionButton from "./transaction-button";




export default function CourseDetail({ course, picturecourse }) {
  return (
    <>
      <Row
        style={{
          backgroundColor: "rgba(7, 15, 43, 0.7)",
          height: "500px",
        }}
      >
        <Col>
          <h1
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30%",
              fontSize: "400%",
              fontFamily: "ArchTH",
              textAlign: "center",
              color: "#FAF0E6",

            }}
          >
            วิชา {course.name}
          </h1>
          <h4
            style={{
              textAlign: "center",
              color: "#FAF0E6",
              fontFamily: "ArchTH",
            }}
          >
            ผู้สอน : {course.name_teacher}
          </h4>
        </Col>
        <Col>
          <Image
            src={"http://localhost:1337" + picturecourse}
            class="rounded mx-auto d-block"
            alt="Responsive image"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxHeight: "500px",
              height: "250px",
              marginTop: "20%",
            }}
          >
          </Image></Col>
      </Row>

      <Row
        style={{
          backgroundColor: "#1B1A55",
          height: "1000px",
        }}
      >
        <Col>
          <h2
            style={{
              color: "#FAF0E6",
              marginTop: "3%",
              marginBottom: "5px",
              fontFamily: "ArchTH",
            }}
          >
            เกี่ยวกับ
          </h2>
          <h4
            style={{
              color: "#FAF0E6",
              marginBottom: "30px",
              marginLeft: "15px",
            }}
          >
            {course.description}
          </h4>
          <h2
            style={{
              color: "#FAF0E6",
              marginBottom: "5px",
              fontFamily: "ArchTH",
            }}
          >
            เนื้อหาภายในคอร์ส
          </h2>
          <h4>

          </h4>
        </Col>
        <Col>
          <h2
            style={{
              color: "#FAF0E6",
              fontSize: "40px",
              marginTop: "3%",
              marginBottom: "5px",
              fontFamily: "ArchTH",
              textAlign: "center",
            }}
          >
            ฿ {course.price}
          </h2>
          <Container
            style={{
              marginTop: "3%",
              marginLeft: "35%",
            }}
          >
            <button
              style={{
                outline: "none",
                cursor: "pointer",
                border: "none",
                padding: "0.9rem 2rem",
                margin: "0",
                fontFamily: "inherit",
                fontSize: "inherit",
                position: "relative",
                display: "inline-block",
                letterSpacing: "0.05rem",
                fontWeight: "700",
                fontSize: "17px",
                borderRadius: "500px",
                overflow: "hidden",
                background: "rgba(146, 144, 195, 0.9)",
                color: "#070F2B",
              }}

            >
              <span>
                dummy button
              </span>
            </button>
            <h2
              style={{
                color: "#FAF0E6",
                marginBottom: "5px",
                fontFamily: "ArchTH",
                marginTop: "50px",
              }}
            >
              หมวดหมู่
            </h2>
            <h4
              style={{
                color: "#FAF0E6",
                marginBottom: "30px",
              }}
            >
              test
            </h4>
            <h2
              style={{
                color: "#FAF0E6",
                marginBottom: "5px",
                fontFamily: "ArchTH",
                marginTop: "50px",
              }}
            >
              ผู้สอน
            </h2>
            <h4
              style={{
                color: "#FAF0E6",
              }}
            >
              <BsPersonCircle />
              {course.name_teacher}
            </h4>
            <h4
              style={{
                color: "#FAF0E6",
              }}
            >
              <BsFillEnvelopeAtFill />
              {course.mail_teacher}
            </h4>
            <h4
              style={{
                color: "#FAF0E6",
              }}
            >
              <BsFillTelephoneFill />
              {course.phone_number}
            </h4>
          </Container>
        </Col>
      </Row >


    </>
  );
}
