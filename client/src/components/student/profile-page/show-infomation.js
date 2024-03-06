import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Table,
  ProgressBar,
} from "react-bootstrap";
import { useEffect, useState } from "react";


export default function ShowInfomation({
  userInfomation,
  setIsEditInfomation,
}) {
  const [myCourses, setMyCourses] = useState(null);

  useEffect(() => {
    // console.log(userInfomation);
    const mappedCourseLearning = userInfomation.courses.map((course) => {
      const courseProgress = course.course_chapters.reduce(
        (a, b) => a + b.duration,
        0
      );
      const learningProgress = userInfomation.learning_progresses.filter(
        (progress) => progress.course.id === course.id
      );

      const userProgress = learningProgress.reduce(
        (a, b) => a + (b.progress * b.material.duration) / 100,
        0
      );
      return {
        course: course,
        progress: { courseProgress, userProgress },
      };
    });
    setMyCourses(mappedCourseLearning);
  }, [userInfomation]);

  return (
    <>
      {userInfomation && myCourses && (
        <>
          {" "}
          <Card className="text-center mb-3">
            <Card.Body style={{ marginTop: "105px" }}>
              <Card.Img
                style={{
                  maxHeight: "150px",
                  maxWidth: "150px",
                  height: "150px",
                  weight: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#C7C8CC",
                }}
                src={
                  userInfomation?.avatar?.url
                    ? "http://localhost:1337" + userInfomation.avatar.url
                    : ""
                }
                alt="Avatar"
              />
              <Card.Title>{userInfomation.username}</Card.Title>
              <Card.Title>Email Address</Card.Title>
              <Card.Text>{userInfomation.email}</Card.Text>
              <Button
                onClick={() => setIsEditInfomation((prevState) => !prevState)}
                variant="secondary"
              >
                แก้ไขข้อมูลส่วนตัว
              </Button>
            </Card.Body>
          </Card>
          <h1>คอร์สเรียนของฉัน</h1>
          <Table>
            <thead>
              <tr>
                <th>รูปภาพ</th>
                <th>ชื่อวิชา</th>
                <th>ความคืบหน้า</th>
              </tr>
            </thead>
            <tbody style={{height:"500px",}}>
              {myCourses &&
                myCourses.map((course) => (
                  <tr>
                    <td>
                      <Image
                        style={{ maxHeight: "50px", minWidth: "50px" }}
                        src={
                          userInfomation?.avatar?.url
                            ? "http://localhost:1337" +
                              userInfomation.avatar.url
                            : ""
                        }
                      />
                    </td>
                    <td>
                      <Link to={`/course/${course.course.name}/study`}>
                        {course.course.name}
                      </Link>
                    </td>
                    <td>
                      {course?.progress?.userProgress /
                      course?.progress?.courseProgress
                        ? Math.round(
                            (course.progress.userProgress /
                              course.progress.courseProgress) *
                              100
                          )
                        : 0}{" "}
                      %
                      <ProgressBar
                        variant="info"
                        now={Math.round(
                          (course.progress.userProgress /
                            course.progress.courseProgress) *
                            100
                        )}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}

      {/* <Card className="my-3">
        <Card.Header>คอร์สเรียนของฉัน</Card.Header>
        {myCourses.map((payment) => (
          <Card.Body key={payment.id}>
            <Row sm="4">
              <Col>
                <Image
                  style={{ maxHeight: "50px", minWidth: "50px" }}
                  src={"http://localhost:1337" + payment.course.picture[0].url}
                />
              </Col>
              <Col>
                <Link to={`/course/${payment.course.name}`}>
                  <Card.Text>{payment.course.name}</Card.Text>
                </Link>
              </Col>
            </Row>
          </Card.Body>
        ))}
      </Card> */}
    </>
  );
}
