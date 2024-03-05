import React, { useEffect } from "react";
import { Button, Container, Image, Table } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";

export default function CartList({
  carts,
  setCarts,
  selectedCoursesId,
  setSelectedCoursesId,
}) {
  const deleteCourseCart = async (cartId) => {
    try {
      await ax.delete(`${conf.deleteCartById}${cartId}`);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(carts);
    }
  };

  const handleCheckboxChange = (courseId) => {
    setSelectedCoursesId((prevSelectedCoursesId) => {
      if (prevSelectedCoursesId.includes(courseId)) {
        return prevSelectedCoursesId.filter((id) => id !== courseId);
      } else {
        return [...prevSelectedCoursesId, courseId];
      }
    });
  };

  return (
    <Container>
      <h1 className="text-center">ตะกร้า</h1>

      <Table>
        <thead>
          <tr>
            <th id="course-thumbnail"></th>
            <th id="course-selected"></th>
            <th>สินค้า</th>
            <th>ราคา (บาท)</th>
            <th id="course-canceled"></th>
          </tr>
        </thead>
        <tbody>
          {carts &&
            carts.map((course) => (
              <tr key={course.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(course.id)}
                  />
                </td>
                <td>
                  {" "}
                  <Image
                    style={{ maxHeight: "50px", minWidth: "50px" }}
                    src={"http://localhost:1337" + course.picture[0].url}
                  />
                </td>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>
                  <BsXCircleFill
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCarts(carts.filter((cart) => cart.id !== course.id));
                      deleteCourseCart(course.carts[0].id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
