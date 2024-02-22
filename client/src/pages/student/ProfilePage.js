import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Card, Container } from "react-bootstrap";

import { Image } from "react-bootstrap";

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
            <p>{userInfomation.username}</p>
            <h1>Email Address</h1>
            <p>{userInfomation.email}</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>ประวัติการซื้อ</Card.Body>
        </Card>
        <p>คอร์สทั้งหมด</p>
        {userInfomation.courses.map((course) => (
          <p key={course.id}>{course.name}</p>
        ))}
      </Container>
    );
  }
}
