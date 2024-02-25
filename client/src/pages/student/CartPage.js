import { useEffect, useState } from "react";

import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Container } from "react-bootstrap";

import CartList from "../../components/student/cart-page/cart-list";
import CartProgressBar from "../../components/student/cart-page/cart-progress-bar";

export default function CartPage() {
  const [carts, setCarts] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getUserCartBookingList);
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
    console.log(carts);
  }, [carts]);

  return (
    <Container>
      <CartProgressBar></CartProgressBar>
      <CartList carts={carts} />{" "}
    </Container>
  );
}
