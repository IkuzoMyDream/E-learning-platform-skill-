import CourseDetail from "../../components/student/course-detail-page/course-detail";
import AddToCartButton from "../../components/student/course-detail-page/AddTocartButton";

import { Button, Container } from "react-bootstrap";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";

import conf from "../../utils/config/main";
import ax from "../../utils/config/ax";

export default function CourseDetailPage() {
  const { state } = useContext(AuthContext);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getUserCourseEnrollments);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <Container>
      <CourseDetail />
      {state.isLoggedIn && state.user.role === "Student" && (
        <Button variant="secondary"></Button>
      )}
    </Container>
  );
}
