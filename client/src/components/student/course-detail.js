import { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { courseName } = useParams();
  const [course, setCourse] = useState({});

  const fetchItems = async () => {
    const response = await ax.get(
      `${conf.getCourseDetailEndpoint}${courseName}`
    );
    setCourse(response?.data?.data[0]?.attributes);
  };

  useEffect(() => {  
    fetchItems();
  }, []);

  return (
    <>
      <h1>วิชา {courseName}</h1>
      <p>{course.name}</p>
      <p>{course.description}</p>
    </>
  );
}
