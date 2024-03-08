import { Button, Image, Table } from "react-bootstrap";
import config from "../../../config";

export default function ModalCart({
  setTransactionState,
  setCurrentTransactionState,
  totalPrice,
  selectedCourses,
  currentTransactionState,
}) {
  return (
    <>
      {" "}
      <Table>
        <thead>
          <tr>
            <th id="course-thumbnail"></th>
            <th>สินค้า</th>
            <th>ราคา</th>
          </tr>
        </thead>
        <tbody>
          {selectedCourses &&
            selectedCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  <Image
                    style={{ maxHeight: "50px", minWidth: "50px" }}
                    src={config.serverUrlPrefix + course.picture[0].url}
                  />
                </td>
                <td>{course.name}</td>
                <td>{course.price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <h3 className="text-center">ราคาทั้งหมด {totalPrice}</h3>
      <Button
        variant="success"
        onClick={() => {
          setCurrentTransactionState((prevState) => prevState + 1);
          setTransactionState((prevState) => ({
            ...prevState,
            [currentTransactionState]: {
              now: 33,
              active: false,
              disabled: true,
            },
            [currentTransactionState + 1]: {
              now: prevState[currentTransactionState].now + 33.33,
              active: true,
              disabled: false,
            },
          }));
        }}
      >
        ชำระเงิน
      </Button>
    </>
  );
}
