import { useEffect, useState } from "react";
import CourseList from "../../components/student/courses-page/course-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getAllCourse);
      setCourses(
        response.data.data.map((course) => {
          return {
            id: course.id,
            ...course.attributes,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return <CourseList courses={courses} />;
}
