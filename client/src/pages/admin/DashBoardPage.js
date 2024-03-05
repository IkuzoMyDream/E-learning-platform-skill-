import AdminNavbar from "../../components/admin/dashboard-page/admin-navbar";
import ax from "../../utils/config/ax";
import { useEffect, useState } from "react";
import AdminFuncHeader from "../../components/admin/dashboard-page/admin-func-header";
import CoursesList from "../../components/admin/dashboard-page/courses-list";
import FilterBar from "../../components/admin/dashboard-page/filter-bar";

export default function DashBoardPage() {
  const [amountUser, setAmountUser] = useState(null);
  const [totalEarning, setTotalEarning] = useState(null);
  const [totalProgresses, setTotalProgresses] = useState(null);
  const [categories, setCategories] = useState(null);

  const [courses, setCourses] = useState(null);

  const [search, setSearch] = useState("");
  const [filterSort, setFilterSort] = useState("คอร์สขายดี");

  const fetchItems = async () => {
    try {
      const userAmountResponse = await ax.get("/users?populate=role");
      const totalEarningsResponse = await ax.get("/courses?populate=enrollers");
      const totalProgressesResponse = await ax.get("/progresses?populate=*");
      const categories_response = await ax.get("/categories?populate=courses");
      setCategories(
        categories_response.data.data.map((category) => ({
          id: category.id,
          ...category.attributes,
        }))
      );
      setAmountUser(
        userAmountResponse.data.filter((user) => user.role.name === "Student")
          .length
      );
      setTotalEarning(
        totalEarningsResponse.data.data.reduce(
          (total, course) =>
            course.attributes.enrollers.data.length * course.attributes.price +
            total,
          0
        )
      );
      setTotalProgresses(
        totalProgressesResponse.data.data.reduce(
          (total, progress) =>
            (progress.attributes.progress / 100) *
              progress.attributes.material.data.attributes.duration +
            total,
          0
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const fetchCourses = async () => {
    try {
      const coursesResponse = await ax.get(
        "/courses?populate[0]=enrollers&populate[1]=progresses&populate[2]=picture&populate[3]=categories"
      );
      setCourses(coursesResponse.data.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCourses();
  }, []);

  useEffect(() => {}, [totalProgresses]);

  return (
    <>
      <AdminNavbar />
      <AdminFuncHeader data={{ amountUser, totalEarning, totalProgresses }} />
      <FilterBar
        setSearch={setSearch}
        filterSort={filterSort}
        setFilterSort={setFilterSort}
      />
      <CoursesList
        categories={categories}
        courses={courses}
        search={search}
        filterSort={filterSort}
      />
    </>
  );
}
