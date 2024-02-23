import React, { useEffect, useState } from "react";
import ax from "../../utils/config/ax";
import conf from "../../utils/config/main";
import { useParams } from "react-router-dom";
import AddToCartButton from "./AddTocartButton";

export default function CourseDetail() {
  const { courseName } = useParams();
  const [course, setCourse] = useState({});
  const [pictureCouse, setpictureCouse] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState(''); 
  
  const fetchItems = async () => {
    const response = await ax.get(
      `${conf.getCourseDetailEndpoint}${courseName}`
    );
    setCourse(response?.data?.data[0]?.attributes);
    setpictureCouse(response.data.data[0].attributes.picture.data[0].attributes.url)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <h1 style={{ backgroundColor: "#004AAD", color: "white", textAlign: "center", padding: "20px", fontFamily: "ArchTH", fontSize: "30px", fontWeight: "bold" }}>วิชา {courseName}</h1>
      <div class="text-center">
       <img src={"http://localhost:1337" + pictureCouse} class="rounded mx-auto d-block" alt="Responsive image" style={{maxHeight: "220px"}}/>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ backgroundColor: "#004AAD", color: "white", textAlign: "center", padding: "10px", fontFamily: "ArchTH", fontSize: "22px", fontWeight: "bold" }}>
          คำอธิบายรายวิชา</h1>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginLeft: "50px" }}>
          <p style={{ whiteSpace: "pre-line", fontFamily: "ArchTH", fontSize: "18px" }}>
            {course.description}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ backgroundColor: "#004AAD", color: "white", textAlign: "center", padding: "10px", fontFamily: "ArchTH", fontSize: "22px", fontWeight: "bold" }}>
          พัฒนาวิชาโดย</h1>
      </div>
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginLeft: "50px" }}>
          <p style={{ whiteSpace: "pre-line", fontFamily: "ArchTH", fontSize: "18px" }}>
            {course.name_teacher}</p>
          <p style={{ whiteSpace: "pre-line", fontFamily: "ArchTH", fontSize: "18px" }}>
            {course.phone_number}</p>
          <p style={{ whiteSpace: "pre-line", fontFamily: "ArchTH", fontSize: "18px" }}>
            {course.mail_teacher}</p>
        </div>
      </div>
      <AddToCartButton isLoggedIn={isLoggedIn} role={role} />
    </>
  );
}
