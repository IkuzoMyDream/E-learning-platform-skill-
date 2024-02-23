import CategoryList from "../../components/student/home-page/category-list";
import CarouselSlider from "../../components/student/home-page/carousel-slider";
import CourseRecommended from "../../components/student/home-page/course-recommended";
import CourseNewest from "../../components/student/home-page/course-newest";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useState } from "react";

function HomePage() {
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

  useState(() => {
    fetchItems();
  }, []);

  return (
    <>
      <CarouselSlider />
      <CategoryList />
      <CourseRecommended courses={courses} />
      <CourseNewest courses={courses} />
    </>
  );
}

export default HomePage;
