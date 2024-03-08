import { useContext, useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditInfomation from "../../components/student/profile-page/edit-infomation";
import ShowInfomation from "../../components/student/profile-page/show-infomation";

import { AuthContext } from "../../utils/auth/Auth.context";
import config from "../../config";

export default function ProfilePage() {
  const [userInfomation, setUserInfomation] = useState(null);
  const [isEditInfomation, setIsEditInfomation] = useState(false);

  const [isInfoUpdated, setIsInfoUpdated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [myCourses, setMyCourses] = useState(null);

  const { state } = useContext(AuthContext);

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
    // console.log(userInfomation);

    setMyCourses(userInfomation?.payments.map((payment) => payment.course));

    setAvatarUrl(
      userInfomation?.avatar?.url
        ? `${config.serverAdminUrlPrefix}${userInfomation?.avatar?.url}`
        : "/logo.jpg"
    );
    setFirstname(userInfomation?.firstname);
    setLastName(userInfomation?.lastname);
    setPhonenumber(userInfomation?.phone_number);
    setEmail(userInfomation?.email);
    setAboutMe(userInfomation?.about_me);
  }, [userInfomation]);

  useEffect(() => {
    // console.log(firstname, lastname, phoneNumber, email, aboutMe);
  }, [firstname, lastname, phoneNumber, email, aboutMe]);

  if (userInfomation) {
    return (
      <Container>
        {!isEditInfomation ? (
          <ShowInfomation
            userInfomation={userInfomation}
            setIsEditInfomation={setIsEditInfomation}
          />
        ) : (
          <EditInfomation
            state={state}
            isInfoUpdated={isInfoUpdated}
            setIsInfoUpdated={setIsInfoUpdated}
            setUserInfomation={{
              setAvatarUrl,
              setFirstname,
              setLastName,
              setPhonenumber,
              setEmail,
              setAboutMe,
            }}
            userInfomation={{
              avatarUrl,
              firstname,
              lastname,
              phoneNumber,
              email,
              aboutMe,
            }}
            setIsEditInfomation={setIsEditInfomation}
          />
        )}
      </Container>
    );
  }
}
