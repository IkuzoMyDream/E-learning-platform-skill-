import { useContext, useEffect, useState } from "react";
import TrolleyList from "../../components/student/trolley-booking-page/trolley-booking-list";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
//import { AuthContext } from "../../utils/auth/Auth.context";

export default function TrolleyPage() {
  const [trolleise, setTrolley] = useState([]);
  //const [state] = useContext(AuthContext)


  const fetchItems = async () => {
    try {
      const response = await ax.get(conf.getBooking);
      setTrolley(
        response.data.data.data.map((trolley) => {
          return {
            id: trolley.id,
            ...trolley.attributes,
          };
        })
      );
      console.log('อยู่ตรงนี้จ้า =' , trolleise);
    } catch (err) {
      console.log(err);
      
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return <TrolleyList trolleise = {trolleise} />
}