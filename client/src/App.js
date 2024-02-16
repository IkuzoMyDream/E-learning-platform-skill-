// utils
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./utils/auth/Auth.context";

// page
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/student/CategoryPage";
import CoursesPage from "./pages/student/CoursesPage";
import CourseDetailPage from "./pages/student/CourseDetailPage";
import PrivateRoutes from "./utils/private-routes";
import MenuBar from "./components/menu-bar";

function App() {
  const { state } = useContext(AuthContext);
  const role = state?.user?.role;
  return (
    <>
      <MenuBar />
      <Router>
        <Routes>
          {/* public */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/" element={<CategoryPage />}></Route>
          <Route
            path="/category/:categoryName"
            element={<CoursesPage />}
          ></Route>
          <Route
            path="/category/:categoryName/:courseName"
            element={<CourseDetailPage />}
          ></Route>

          {/* role === std */}
          <Route element={<PrivateRoutes />}></Route>

          {/* role == admin */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
