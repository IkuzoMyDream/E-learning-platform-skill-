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
import MenuBarHeader from "./components/menu-bar-header";
import ProfilePage from "./pages/student/ProfilePage";
import CategoryCoursePage from "./pages/student/CategoryCoursePage";
import MenuBarFooter from "./components/menu-bar-footer";
import TrolleyPage from "./pages/student/TrolleyPage";

function App() {
  const { state } = useContext(AuthContext);
  // const role = state?.user?.role;
  return (
    <>
      <Router>
        <MenuBarHeader />
        <Routes>
          {/* public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<HomePage/>}/>
          <Route path="/course" element={<CoursesPage />} />
          <Route path="/trolley" element={<TrolleyPage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryCoursePage />}
          />
          <Route path="/course/:courseName" element={<CourseDetailPage />} />

          {/* role === std */}
          <Route element={<PrivateRoutes allowedRole="Student" />}>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Route>

          {/* role == admin */}
        </Routes>
        {/* <MenuBarFooter /> */}
      </Router>
    </>
  );
}

export default App;
