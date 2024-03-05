import { useEffect, useState, useContext } from "react";
import { Card, Col, Row ,Container} from "react-bootstrap";
import ReactPlayer from "react-player";
import { AuthContext } from "../../../utils/auth/Auth.context";

export default function CourseDetailHeader({ course }) {
  const [urlImg, setUrlImg] = useState("");
  const { state: ContextState, login, logout } = useContext(AuthContext);

  useEffect(() => {
    setUrlImg(course?.picture?.data[0]?.attributes?.url);
  }, [course]);
  return (
    <>
    <Container>
      <Card style={{width:"auto", backgroundColor:"#EEF5FF",}}>
        <div style={{ paddingTop: !ContextState.isLoggedIn ? "140px" : "85px" }}></div>
        <Card.Body >
          <div className="my-5">
            <Row sm={2} xs={1}>
              <Col>
                <h1
                  style={{
                    float: "center",
                  }}
                >{course.name}</h1>
                <p>จำนวนผู้เรียน {course?.enrollers?.data?.length} คน</p>
              </Col>
              <Col>
                <div class="embed-responsive embed-responsive-16by9">    
                  <ReactPlayer
                    url={
                      "http://localhost:1337" +
                      course?.preview?.data?.attributes?.url
                    }
                    volume={0}
                    playing={true}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      </Container>
    </>
  );
}
