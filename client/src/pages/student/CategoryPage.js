import CategoryList from "../../components/student/category-list";
import CarouselSlider from "../../components/student/carousel-slider";
import CourseSearch from "../../components/student/course-search";

function CategoryPage() {
  return (
    <>
      <CarouselSlider></CarouselSlider>
      <CourseSearch></CourseSearch>
      <CategoryList></CategoryList>
    </>
  );
}

export default CategoryPage;
