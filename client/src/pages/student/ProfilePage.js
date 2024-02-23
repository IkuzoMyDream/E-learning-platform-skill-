import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Button, Card, Container } from "react-bootstrap";


export default function ProfilePage() {
  const [userInfomation, setUserInfomation] = useState(null);

  const fetchData = async () => {
    try {
      const response = await ax.get(conf.getUserInfomation);
      setUserInfomation(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(userInfomation);
  }, [userInfomation]);

  if (userInfomation) {
    return (
      <Container>
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
            <Button variant="secondary">แก้ไขข้อมูลส่วนตัว</Button>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>ประวัติการซื้อ</Card.Header>
        </Card>
        <Card>
          <Card.Header>คอร์สทั้งหมด</Card.Header>
          {userInfomation.courses.map((course) => (
            <Card.Body key={course.id}>{course.name}</Card.Body>
          ))}
        </Card>
      </Container>
    );
  }
}
