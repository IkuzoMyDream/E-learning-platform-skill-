import CategoryList from "../../components/student/home-page/category-list";
import CarouselSlider from "../../components/student/home-page/carousel-slider";
import CourseRecommended from "../../components/student/home-page/course-recommended";
import CourseNewest from "../../components/student/home-page/course-newest";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import './Css/css_search_course.css'
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");
  
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/course/${searchCourse}`);
  };

  return (
    <Container 
      style={{
        background:"",
      }}
    >
      <CarouselSlider />
      <form className="form d-flex" onSubmit={handleSearch} style={{border:'0.1px solid blue'}}>
        <button type="submit">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          className="input me-2"
          placeholder="ค้นหารายวิชา"
          aria-label="Search"
          type="search"
          onChange={(e) => setSearchCourse(e.target.value)}
        />
        <button className="reset" type="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </form>
      <CategoryList />
      <CourseRecommended courses={courses} />
      <CourseNewest courses={courses} />
      <div className="text-center">
        <Button
          className="my-3"
          variant="secondary"
          onClick={() => navigate("/course")}
        >
          ดูเพิ่มเติม
        </Button>
      </div>
    </Container>
  );
}

export default HomePage;
