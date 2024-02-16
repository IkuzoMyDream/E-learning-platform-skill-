import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Card, Container } from "react-bootstrap";
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

  return (
    <Container>
      <h1 className="text-center">หมวดหมู่รายวิชา</h1>
      <div className="row">
        {categories.map((d) => (
          <div className="col-md-3" key={d.id}>
            <Link style={{ textDecoration: "none" }} to={`/category/${d.name}`}>
              <Card className="mb-3">
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
