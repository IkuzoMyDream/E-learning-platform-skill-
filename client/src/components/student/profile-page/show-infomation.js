import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useEffect } from "react";

export default function ShowInfomation({
  userInfomation,
  setIsEditInfomation,
}) {
  useEffect(() => {
    console.log(userInfomation);
  }, [userInfomation]);

  return (
    <>
      <Card className="text-center mb-3">
        <Card.Body>
          <Card.Img
            style={{
              maxHeight: "100px",
              maxWidth: "100px",
              borderRadius: "50%",
            }}
            src={"http://localhost:1337" + userInfomation.avatar.url}
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
      <Card className="my-3">
        <Card.Header>คอร์สเรียนของฉัน</Card.Header>
        {userInfomation.courses.map((course) => (
          <Card.Body key={course.id}>
            <Link to={`/course/${course.name}`}>
              <Card.Text>{course.name}</Card.Text>
            </Link>
          </Card.Body>
        ))}
      </Card>
    </>
  );
}
