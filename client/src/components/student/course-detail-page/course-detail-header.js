import { useEffect, useState, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { AuthContext } from "../../../utils/auth/Auth.context";

export default function CourseDetailHeader({ course }) {
  const [urlImg, setUrlImg] = useState("");
  const { state: ContextState, login, logout } = useContext(AuthContext);

  useEffect(() => {
    setUrlImg(course?.picture?.data[0]?.attributes?.url);
  }, [course]);
  return (
    <Card>
      <div style={{ marginTop: !ContextState.isLoggedIn ? "140px" : "85px" }} />
      <Card.Body >
        <div className="my-5">
          <Row sm={2} xs={1}>
            <Col>
              <h1>{course.name}</h1>
              <p>จำนวนผู้เรียน {course?.enrollers?.data?.length} คน</p>
            </Col>
            <Col>
              <div>
                <ReactPlayer
                  url={
                    "http://localhost:1337" +
                    course?.preview?.data?.attributes?.url
                  }
                  volume={0}
                  playing={true}
                  controls
                />
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
