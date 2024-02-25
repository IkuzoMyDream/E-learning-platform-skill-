import { useContext, useEffect, useState } from "react";
import CartList from "../../components/student/trolley-booking-page/cart-booking-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Container } from "react-bootstrap";

import { AuthContext } from "../../utils/auth/Auth.context";

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
      {" "}
      <CartList carts={carts} />{" "}
    </Container>
  );
}
