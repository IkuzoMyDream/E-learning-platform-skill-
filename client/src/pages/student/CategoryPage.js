import axios from "axios";
import MenuBar from "../../components/menu-bar";
import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryList from "../../components/student/category-list";

function CategoryPage() {
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

  return <CategoryList />;
}

export default CategoryPage;
