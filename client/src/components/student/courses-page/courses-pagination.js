import { Container, Pagination } from "react-bootstrap";

export default function CoursesPagination({
  filteredCourses,
  paginate,
  currentPage,
  coursesPerPage,
  currentCourses,
}) {
  console.log(currentCourses);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[
            ...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys(),
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
          />
        </Pagination>
      </div>
    </Container>
  );
}
