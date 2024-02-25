import CourseDetail from "../../components/student/course-detail-page/course-detail";

import { Button, Container } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";

import conf from "../../utils/config/main";
import ax from "../../utils/config/ax";
import TransactionButton from "../../components/student/course-detail-page/transaction-button";
import { useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const { state } = useContext(AuthContext);
  const { courseName } = useParams();
  const [course, setCourse] = useState({});
  const [picturecourse, setPicturecourse] = useState({});
  const [enrollments, setEnrollments] = useState([]);

  // for params
  const [isPurchased, setIspurchased] = useState(false);
  const [isCarted, setIsCarted] = useState(false); // to fix soon
  const [userId, setUserId] = useState(undefined);
  const [courseId, setCourseId] = useState(undefined);

  const fetchItems = async () => {
    let response = await ax.get(`${conf.getCourseDetailEndpoint}${courseName}`);
    setCourseId(response?.data?.data[0]?.id);
    response = response?.data?.data[0]?.attributes;
    setCourse(response);
    setPicturecourse(response?.picture?.data[0]?.attributes?.url);

    setEnrollments(
      response.enrollers.data?.map((enroller) => {
        return { id: enroller.id, ...enroller.attributes };
      })
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setUserId(state?.user?.id);
    setIspurchased(
      enrollments.some((enroller) => enroller.id === state?.user?.id)
    );
  }, [enrollments, state]);

  return (
    <Container>
      <CourseDetail course={course} picturecourse={picturecourse} />
      <TransactionButton
        isLoggedIn={state?.isLoggedIn}
        isPurchased={isPurchased}
        isCarted={isCarted}
        userId={userId}
        courseId={courseId}
      />
    </Container>
  );
}
