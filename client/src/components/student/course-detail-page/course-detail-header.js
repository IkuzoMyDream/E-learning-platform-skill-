import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";

export default function CourseDetailHeader({ course }) {
  const [urlImg, setUrlImg] = useState("");

  useEffect(() => {
    setUrlImg(course?.picture?.data[0]?.attributes?.url);
  }, [course]);
  return (
    <Card>
      <div style={{marginTop:"80px"}}/>
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
