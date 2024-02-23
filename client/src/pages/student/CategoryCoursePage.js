import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import CategoryCourseList from "../../components/student/category-course-page/category-course-list";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function CategoryCoursePage() {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getCoursesEndpoint + categoryName);
      setCourses(
        response?.data?.data[0]?.attributes?.courses?.data?.map((d) => {
          return {
            id: d.id,
            ...d.attributes,
          };
        })
      );
      setCategory(response.data.data[0].attributes);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);
  
  return (
    <Container>
      <h1 className="text-center" style={{ color: "#1B1A55" }}>
        รายวิชาสำหรับหมวดหมู่
      </h1>
      <h1 style={{ color: "#1B1A55" }} className="text-left">
        {categoryName}
      </h1>
      <div
        className="Container"
        style={{ backgroundColor: "#A0BFE0", padding: "10px" }}
      >
        <h4 style={{ color: "white" }}>{category.detail}</h4>
      </div>
      <div style={{ marginBottom: "50px" }}></div>
      <CategoryCourseList courses={courses} />
    </Container>
  );
}
