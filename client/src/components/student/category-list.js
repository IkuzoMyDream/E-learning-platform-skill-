import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  const fetchItems = async () => {
    const response = await ax.get(conf.getCategoriesEndpoint);
    setCategories(
      response?.data?.data?.map((d) => {
        return {
          id: d.id,
          ...d.attributes,
        };
      })
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <Container>
      <h1 className="text-center mb-5">หมวดหมู่รายวิชา</h1>
      <Row>
        {categories.map((d) => (
          <Col xs="4" sm="3" className="text-center mb-3">
            <Link style={{ textDecoration: "none" }} to={`/category/${d.name}`}>
              <Image
                src={"http://localhost:1337" + d.picture.data[0].attributes.url}
                style={{ maxHeight: "80px", maxWidth: "80px" }}
              />
              <p style={{fontFamily: "Prompt sans-serif"}}>{d.name}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
