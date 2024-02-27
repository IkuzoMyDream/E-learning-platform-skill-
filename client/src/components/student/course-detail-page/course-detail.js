import { Col, Row, Image } from "react-bootstrap";
import {
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";

export default function CourseDetail({ course, picturecourse }) {
  return (
    <>
      <Row
        style={{
          backgroundColor: "rgba(7, 15, 43, 0.7)",
          height: "300px",
        }}
      >
        <Col>
          <h1
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "100px",
              fontSize: "50px",
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
              marginTop: "25px",
            }}
          >
          </Image></Col>
      </Row>

      <Row
        style={{
          backgroundColor: "#1B1A55",
        }}
      >
        <Col>
          <h2
            style={{
              color: "#FAF0E6",
            }}
          >
            เกี่ยวกับ
          </h2>

      </Col>
    </Row >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            backgroundColor: "#004AAD",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "ArchTH",
            fontSize: "22px",
            fontWeight: "bold",
            width: "450px",
          }}
        >
          คำอธิบายรายวิชา
        </h1>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginLeft: "50px" }}>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "ArchTH",
              fontSize: "18px",
            }}
          >
            {course.description}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            backgroundColor: "#004AAD",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "ArchTH",
            fontSize: "22px",
            fontWeight: "bold",
            width: "450px",
          }}
        >
          พัฒนาวิชาโดย
        </h1>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginLeft: "50px" }}>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "ArchTH",
              fontSize: "18px",
            }}
          >
            <BsPersonCircle />
            {course.name_teacher}
          </p>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "ArchTH",
              fontSize: "18px",
            }}
          >
            <BsFillTelephoneFill />
            {course.phone_number}
          </p>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "ArchTH",
              fontSize: "18px",
            }}
          >
            <BsFillEnvelopeAtFill />
            {course.mail_teacher}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            backgroundColor: "#004AAD",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "ArchTH",
            fontSize: "30px",
            //fontWeight: "bold",
            width: "450px",
          }}
        >
          {course.price} ฿
        </h1>
      </div>
    </>
  );
}
