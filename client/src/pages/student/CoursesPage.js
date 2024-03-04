import { useState, useEffect } from "react";
import CourseList from "../../components/student/courses-page/course-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import CoursesPageHeader from "../../components/student/courses-page/courses-page-header";
import CoursesPagination from "../../components/student/courses-page/courses-pagination";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getAllCourse);
      setCourses(
        response.data.data.map((course) => ({
          id: course.id,
          ...course.attributes,
        }))
      );
      const categories_response = await ax.get("/categories?populate=courses");
      setCategories(
        categories_response.data.data.map((category) => ({
          id: category.id,
          ...category.attributes,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    setFilteredCourses(
      courses.filter((course) => {
        return (
          search.toLowerCase() === "" ||
          course.name.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(
      indexOfFirstCourse,
      indexOfLastCourse
    );
    setCurrentCourses(currentCourses);
  }, [filteredCourses, currentPage]);

  return (
    <>
      <CoursesPageHeader setSearch={setSearch} handleSearch={handleSearch} />
      <CourseList
        courses={courses}
        filteredCourses={currentCourses}
        setFilteredCourses={setFilteredCourses}
        selectedCategoriesId={selectedCategoriesId}
        setSelectedCategoriesId={setSelectedCategoriesId}
        search={search}
        categories={categories}
        paginate={paginate}
      />
      <CoursesPagination
        filteredCourses={filteredCourses}
        paginate={paginate}
        currentPage={currentPage}
        coursesPerPage={coursesPerPage}
        currentCourses={currentCourses}
      />
    </>
  );
}
