import { useEffect, useState } from "react";
import CourseList from "../../components/student/courses-page/course-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import CoursesPageHeader from "../../components/student/courses-page/courses-page-header";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

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
      const categories_response = await ax.get("/categories?populate=courses");
      setCategories(
        categories_response.data.data.map((category) => {
          return { id: category.id, ...category.attributes };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    setFilteredCourses(
      courses.filter((course) => {
        return search.toLowerCase() === ""
          ? course
          : course.name.toLowerCase().includes(search);
      })
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  return (
    <>
      <CoursesPageHeader
        setSearch={setSearch}
        courses={courses}
        setCourses={setCourses}
        handleSearch={handleSearch}
      />
      <CourseList
        courses={courses}
        filteredCourses={filteredCourses}
        setFilteredCourses={setFilteredCourses}
        selectedCategoriesId={selectedCategoriesId}
        setSelectedCategoriesId={setSelectedCategoriesId}
        search={search}
        categories={categories}
      />
      ;
    </>
  );
}
