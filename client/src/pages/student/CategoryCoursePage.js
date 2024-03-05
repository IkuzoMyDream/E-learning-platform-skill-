import { useEffect, useState, useContext } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import Pagination from "react-bootstrap/Pagination";
import CategoryCourseList from "../../components/student/category-course-page/category-course-list";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../utils/auth/Auth.context";

export default function CategoryCoursePage() {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

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

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const { state: ContextState, } = useContext(AuthContext);

  return (
    <>
      <Container
        style={{
          height: "1200px",
        }}
      >

        <h1

          className="text-center"
          style={{ color: "#1B1A55", marginBottom: !ContextState.isLoggedIn ? "140px" : "85px" }}
        >
          .
        </h1>
        <h1
          style={{ color: "#1B1A55", marginBottom: "20px" }}
          className="text-left"
        >
          <div className="text-center" style={{ color: "#1B1A55", marginBottom: "50px" }}>
            รายวิชาสำหรับหมวดหมู่
          </div>
          {categoryName}
        </h1>
        <div
          className="Container"
          style={{ backgroundColor: "#A0BFE0", padding: "10px", marginBottom:"30px", }}
        >
          <h4 style={{ color: "black", textIndent: "2em" }}>{category.detail}</h4>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <CategoryCourseList courses={currentCourses} />
        </div>
      </Container>
            <div style={{ display: "flex", justifyContent: "center", }}>
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastCourse >= courses.length}
          />
        </Pagination>
      </div>
    </>
  );
}
