import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Pagination,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../../../config";

export default function CoursesList({
  courses,
  search,
  filterSort,
  categories,
}) {
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (courseId) => {
    setSelectedCategoriesId((prevSelectedCoursesId) => {
      if (prevSelectedCoursesId.includes(courseId)) {
        return prevSelectedCoursesId.filter((id) => id !== courseId);
      } else {
        return [...prevSelectedCoursesId, courseId];
      }
    });
  };

  useEffect(() => {
    console.log(filteredCourses);
    const filteredSearch = courses?.filter((course) =>
      course?.attributes?.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (filterSort === "คอร์สขายดี") {
      var filteredSort = filteredSearch?.sort(
        (a, b) => a.attributes.enrollers.length - b.attributes.enrollers.length
      );
    } else if (filterSort === "ล่าสุด") {
      var filteredSort = filteredSearch.sort(
        (a, b) =>
          new Date(b.attributes.publishedAt) -
          new Date(a.attributes.publishedAt)
      );
    } else {
      var filteredSort = filteredSearch.sort(
        (a, b) =>
          new Date(a.attributes.publishedAt) -
          new Date(b.attributes.publishedAt)
      );
    }
    setFilteredCourses(filteredSort);
  }, [courses, search, filterSort]);

  useEffect(() => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses?.slice(
      indexOfFirstCourse,
      indexOfLastCourse
    );
    setCurrentCourses(currentCourses);
  }, [filteredCourses, currentPage]);

  useEffect(() => {
    console.log(currentCourses);
  }, [currentCourses]);

  useEffect(() => {
    console.log(courses);
    if (selectedCategoriesId.length === 0) {
      const filtered = courses?.filter((course) =>
        course.attributes.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      const filtered = courses.filter((course) =>
        course?.attributes?.categories?.data.some((category) =>
          selectedCategoriesId.includes(category.id)
        )
      );
      const searched = filtered.filter((course) =>
        course.attributes.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(searched);
    }
  }, [selectedCategoriesId, search, courses, setFilteredCourses]);

  if (filteredCourses && currentCourses && categories) {
    return (
      <Container>
        <Row>
          <Col lg="3">
            <Card>
              <Card.Header>หมวดหมู่</Card.Header>
              <Card.Body>
                <Form>
                  {categories.map((category) => (
                    <>
                      <Form.Check
                        onChange={() => handleCheckboxChange(category.id)}
                        className="my-3"
                        label={
                          category.name +
                          " (" +
                          category.courses.data.length +
                          ")"
                        }
                      />
                    </>
                  ))}
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              {courses && filteredCourses.length !== 0 ? (
                currentCourses.map((course) => (
                  <Col className="my-3" lg="4" sm="4" key={course.id}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/course/${course.attributes.name}`}
                    >
                      <Card key={course.id}>
                        <Card.Img
                          src={
                            config.serverAdminUrlPrefix +
                            course.attributes.picture.data[0].attributes.url
                          }
                          style={{ maxHeight: "150px" }}
                        />
                        <Card.Body>
                          <Card.Subtitle style={{ color: "#3BB3B" }} as="h4">
                            {course.attributes.name}
                          </Card.Subtitle>
                          <br></br>
                          <div>
                            จำนวนผู้ลงทะเบียน{" "}
                            {course.attributes.enrollers.data.length} คน
                          </div>
                          <br></br>
                          <Card.Text>
                            {course.attributes.name_teacher
                              ? course.attributes.name_teacher
                              : "นายสมมติ สมมติ"}
                          </Card.Text>
                          <Card.Img
                            src="/logo-skillpp.png"
                            style={{ maxHeight: "50px", maxWidth: "50px" }}
                          />
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <>not found</>
              )}
            </Row>
          </Col>
        </Row>
        {/* <Row className="my-5">
          {courses && filteredCourses ? (
            currentCourses.map((course) => (
              <>
                <Col sm="4" className="my-3">
                  <Link>
                    <Card>
                      <Card.Img />
                      <Card.Body>
                        <Card.Subtitle>{course.attributes.name}</Card.Subtitle>
                        <br></br>
                        <Card.Text></Card.Text>
                        <Card.Img
                          src="/logo-skillpp.png"
                          style={{ maxHeight: "50px", maxWidth: "50px" }}
                        />
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </>
            ))
          ) : (
            <>none</>
          )}
        </Row> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination>
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {[
              ...Array(
                Math.ceil(filteredCourses?.length / coursesPerPage)
              ).keys(),
            ].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * coursesPerPage >= filteredCourses.length}
            ></Pagination.Next>
          </Pagination>
        </div>
      </Container>
    );
  }
}
