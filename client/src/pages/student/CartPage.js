import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Container, Button } from "react-bootstrap";

import CartList from "../../components/student/cart-page/cart-list";
import CartProgressBar from "../../components/student/cart-page/cart-progress-bar";

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [selectedCoursesId, setSelectedCoursesId] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [enrollers, setEnrollers] = useState([]);

  const [isShowTransactionModal, setIsShowTransactionModal] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getUserCartBookingList);
      // console.log(response);
      // setEnrollers(
      //   response.data.carts.map((cart) => {
      //     return { ...cart.enrollers };
      //   })
      // );
      setCarts(
        response.data.carts.map((cart) => {
          return { ...cart.course };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setSelectedCourses(
      carts.filter((course) => selectedCoursesId.includes(course.id))
    );
  }, [selectedCoursesId]);

  useEffect(() => {
    console.log(enrollers);
  }, [enrollers]);

  return (
    <Container style={{height:"800px",}}>
      <h1 style={{marginBottom:"85px",}}>
        .
      </h1>
      <CartProgressBar
        selectedCoursesId={selectedCoursesId}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        isShowTransactionModal={isShowTransactionModal}
        setIsShowTransactionModal={setIsShowTransactionModal}
      ></CartProgressBar>
      <CartList
        carts={carts}
        setCarts={setCarts}
        selectedCoursesId={selectedCoursesId}
        setSelectedCoursesId={setSelectedCoursesId}
      />

      <Button
        className="my-3"
        variant="success"
        onClick={() => setIsShowTransactionModal(true)}
        disabled={!selectedCoursesId.length}
      >
        ชำระเงิน
      </Button>
    </Container>
  );
}
