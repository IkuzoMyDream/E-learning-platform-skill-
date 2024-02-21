import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Container } from "react-bootstrap";

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
        <img
          style={{ maxHeight: "100px", maxWidth: "100px" }}
          src={"http://localhost:1337" + userInfomation.avatar.url}
        />
        <p>{userInfomation.username}</p>
        <p>คอร์สทั้งหมด</p>
        {userInfomation.courses.map((course) => (
          <p key={course.id}>{course.name}</p>
        ))}
      </Container>
    );
  }
}
