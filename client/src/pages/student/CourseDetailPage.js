import CourseDetail from "../../components/student/course-detail-page/course-detail";
import AddToCartButton from "../../components/student/course-detail-page/AddTocartButton";
import { useContext } from "react";
import { AuthContext } from "../../utils/auth/Auth.context";

export default function CourseDetailPage() {
  const { state } = useContext(AuthContext);

  return (
    <>
      <CourseDetail />
      <AddToCartButton
        isLoggedIn={state?.isLoggedIn}
        role={state?.user?.role}
      />
    </>
  );
}
