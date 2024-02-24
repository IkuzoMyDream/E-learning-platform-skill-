import { useContext, useEffect, useState } from "react";
import CartList from "../../components/student/trolley-booking-page/cart-booking-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

import { Container } from "react-bootstrap";

import { AuthContext } from "../../utils/auth/Auth.context";

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const { state } = useContext(AuthContext);

  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getUserCartBookingList);
      setCarts(response.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // return <TrolleyList carts={carts} />;
  return (
    <Container>
      <CartList carts={carts} />
    </Container>
  );
}
