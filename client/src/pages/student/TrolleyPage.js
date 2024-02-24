import { useContext, useEffect, useState } from "react";
import TrolleyList from "../../components/student/trolley-booking-page/trolley-booking-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { AuthContext } from "../../utils/auth/Auth.context";

export default function TrolleyPage() {
  const [trolley, setTrolley] = useState([]);
  const [state] = useContext(AuthContext)


  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getBooking);
      setTrolley(
        response.data.attributes.map((trolley) => {
          return {
            id: trolley.id,
            courses: trolley.data.attributes.courses,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return <TrolleyList trolley={trolley} />;
}