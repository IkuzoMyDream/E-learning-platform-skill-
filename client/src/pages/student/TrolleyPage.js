import { useEffect, useState } from "react";
import TrolleyList from "../../components/student/trolley-booking-page/trolley-booking-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";

export default function TrolleyPage() {
  const [trolley, setTrolley] = useState([]);

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
  console.log({trolley});
  return <TrolleyList trolley={trolley} />;
}