// utils
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./utils/auth/Auth.context";

// page
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/student/CoursesPage";
import HomePage from "./pages/student/HomePage";
import CourseDetailPage from "./pages/student/CourseDetailPage";
import PrivateRoutes from "./utils/private-routes";
import MenuBar from "./components/menu-bar";
import ProfilePage from "./pages/student/ProfilePage";

function App() {
  const { state } = useContext(AuthContext);
  // const role = state?.user?.role;
  return (
    <>
      <Router>
        <MenuBar />
        <Routes>
          {/* public */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/category/:categoryName"
            element={<CoursesPage />}
          ></Route>
          <Route
            path="/course/:courseName"
            element={<CourseDetailPage />}
          ></Route>

          {/* role === std */}
          <Route element={<PrivateRoutes allowedRole="Student" />}>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Route>

          {/* role == admin */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
