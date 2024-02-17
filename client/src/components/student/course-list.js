import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({})
  const { categoryName } = useParams();

  const fetchItems = async () => {
    const response = await ax.get(`${conf.getCoursesEndpoint}${categoryName}`);
    setCourses(
      response?.data?.data[0]?.attributes?.courses?.data?.map((d) => {
        return {
          id: d.id,
          ...d.attributes,
        };
      })
    );
    setCategory(response.data.data[0].attributes)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // console.log(courses);
    courses.forEach(d => console.log(d.picture.data[0]))
  }, [courses]);


  return (
    <Container>
      <h1 className="text-center">รายวิชาสำหรับหมวดหมู่</h1>
      <h1 style={{ color: '#1B1A55' }} className="text-left">{categoryName}</h1>
      <div className="Container" style={{backgroundColor: '#A0BFE0', padding: '10px'}}>
        <h4 style={{ color: 'white' }}>
          {category.detailcategory} 
        </h4>
      </div>
      <div style={{ marginBottom: '50px' }}></div>
      <div className="row">
        {courses.map((d) => (
          <div className="col-md-3" key={d.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/category/${categoryName}/${d.name}`}
            >
              <Card className="mb-3" style={{ display: "flex", alignItems: "center", }}>
                <Card.Img variant="top" src={"http://localhost:1337"+d.picture.data[0].attributes.url} style={{maxHeight: "286px", maxWidth: "180px"}}/>               
                <Card.Body>
                  <Card.Title>{d.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
