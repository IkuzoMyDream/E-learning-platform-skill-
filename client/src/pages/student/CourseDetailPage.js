import CourseDetail from "../../components/student/course-detail-page/course-detail";

import { Button, Container } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";

import conf from "../../utils/config/main";
import ax from "../../utils/config/ax";
import TransactionButton from "../../components/student/course-detail-page/transaction-button";
import { useParams } from "react-router-dom";
import CourseDetailHeader from "../../components/student/course-detail-page/course-detail-header";
import CourseDetailBody from "../../components/student/course-detail-page/course-detail.body";
import LoginModal from "../../components/student/course-detail-page/login-modal";

export default function CourseDetailPage() {
  const { state } = useContext(AuthContext);
  const { courseName } = useParams();
  const [course, setCourse] = useState({});
  const [picturecourse, setPicturecourse] = useState({});
  const [enrollments, setEnrollments] = useState([]);
  const [chapters, setChapters] = useState(null);

  // for params
  const [isPurchased, setIspurchased] = useState(false);
  const [isCarted, setIsCarted] = useState(false);
  const [userId, setUserId] = useState(undefined);
  const [courseId, setCourseId] = useState(undefined);

  const [isShowLoginModal, setShowLoginModal] = useState(false);

  const fetchItems = async () => {
    let response = await ax.get(`${conf.getCourseDetailEndpoint}${courseName}`);
    const chapters = await ax.get(
      "/courses?populate[course_chapters][populate]=course_materials&filters[name][$eq]=" +
        courseName
    );
    setChapters(
      chapters.data.data[0].attributes.course_chapters.data.map(
        (item) => item.attributes
      )
    );
    if (state.isLoggedIn) {
      var response2 = await ax.get(
        `${conf.getUserCartsFilteredByCourseName}${courseName}`
      );

      response2 = response2?.data?.carts?.filter((cart) => cart.course);
      setIsCarted(response2?.length);
    }
    setCourseId(response?.data?.data[0]?.id);
    response = response?.data?.data[0]?.attributes;
    setCourse(response);
    setPicturecourse(response?.picture?.data[0]?.attributes?.url);

    setEnrollments(
      response?.enrollers?.data?.map((enroller) => {
        return { id: enroller?.id, ...enroller?.attributes };
      })
    );
  };

  useEffect(() => {
    fetchItems();
  }, [state]);

  useEffect(() => {
    setUserId(state?.user?.id);
    setIspurchased(
      enrollments?.some((enroller) => enroller.id === state?.user?.id)
    );
  }, [enrollments, state]);

  useEffect(() => {}, [course]);

  return (
    <Container>
      {course && (
        <>
          <CourseDetailHeader course={course} />
          <CourseDetailBody
            isPurchased={isPurchased}
            isCarted={isCarted}
            state={state}
            course={course}
            userId={userId}
            courseId={courseId}
            setShowLoginModal={setShowLoginModal}
            chapters={chapters}
          />
          <LoginModal
            isShowLoginModal={isShowLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
          {/* <CourseDetail course={course} picturecourse={picturecourse} />
          <TransactionButton
            isLoggedIn={state?.isLoggedIn}
            isPurchased={isPurchased}
            isCarted={isCarted}
            userId={userId}
            courseId={courseId}
          /> */}
        </>
      )}
    </Container>
  );
}
