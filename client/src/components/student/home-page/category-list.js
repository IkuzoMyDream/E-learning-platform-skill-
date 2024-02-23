import { useEffect, useState } from "react";

import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";
import { Link } from "react-router-dom";

import { Card, Container, Image } from "react-bootstrap";

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

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  return (
    <Container>
      <h1 className="text-center">หมวดหมู่รายวิชา</h1>
      <div className="row">
        {categories.map((d) => (
          <div className="col-md-3" key={d.id}>
            <Link style={{ textDecoration: "none" }} to={`/category/${d.name}`}>
              <Card
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Card.Img
                  src={
                    "http://localhost:1337" + d.picture.data[0].attributes.url
                  }
                  style={{
                    maxHeight: "100px",
                    maxWidth: "100px",
                    marginTop: "10px",
                  }}
                />
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

// test branch test
