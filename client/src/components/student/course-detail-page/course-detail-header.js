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
      <Card style={{ marginBottom: !ContextState.isLoggedIn ? "10px" : "85px" }}>
        <div style={{ paddingTop: !ContextState.isLoggedIn ? "1px" : "95px" }}></div>
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
<<<<<<< HEAD
              </Col>
              <Col>
                <div class="embed-responsive embed-responsive-16by9">
=======
                <div>     
>>>>>>> 4c6dd1039b1a4bb1e8f91b9aee7515a732e26fb2
                  <ReactPlayer
                    url={
                      "http://localhost:1337" +
                      course?.preview?.data?.attributes?.url
                    }
                    volume={0}
                    playing={true}
                    controls
<<<<<<< HEAD
                    width="100%"
                    height="100%"
                  />
=======
                    width={Container}
                    height={Container}
                  />              
>>>>>>> 4c6dd1039b1a4bb1e8f91b9aee7515a732e26fb2
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
