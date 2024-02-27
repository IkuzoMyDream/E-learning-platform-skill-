import {
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";

export default function CourseDetail({ course, picturecourse }) {
  return (
    <>
      <h1
        style={{
          backgroundColor: "#004AAD",
          color: "white",
          textAlign: "center",
          padding: "20px",
          fontFamily: "ArchTH",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        วิชา {course.name}
      </h1>
      <div class="text-center">
        <img
          src={"http://localhost:1337" + picturecourse}
          class="rounded mx-auto d-block"
          alt="Responsive image"
          style={{ maxHeight: "220px" }}
        />
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
            width : "450px",
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
            width : "450px",
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
            fontSize: "22px",
            fontWeight: "bold",
            width : "450px",
          }}
        >
          ฿ {course.price}
        </h1>
      </div>
    </>
  );
}
