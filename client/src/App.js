// utils
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./utils/auth/Auth.context";

// page
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/student/CategoryPage";
import StudentNavbar from "./components/student/student-navbar";
import AdminNavbar from "./components/admin/admin-navbar";
import CoursesPage from "./pages/student/CoursesPage";
import CourseDetailPage from "./pages/student/CourseDetailPage";

function App() {
  const { state } = useContext(AuthContext)
  const role = state?.user?.role
  console.log(role)
  return (
    <>
    {role === "Student" && (<StudentNavbar/>)}
    {role === "Admin" && (<AdminNavbar/>)}
    <Router>
      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/category/:categoryName" element={<CoursesPage/>}></Route>
        <Route path="/category/:categoryName/:courseName" element={<CourseDetailPage/>}></Route>

        {/* role === std */}

        {/* role == admin */}
        
      </Routes>
    </Router>
    </>

  );
}

export default App;
