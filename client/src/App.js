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
import MenuBarFooter from "./components/menu-bar-footer";
import ProfilePage from "./pages/student/ProfilePage";
import CategoryCoursePage from "./pages/student/CategoryCoursePage";
import CartPage from "./pages/student/CartPage";
import StudyPage from "./pages/student/StudyPage";
import DashBoardPage from "./pages/admin/DashBoardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AddCoursePage from "./pages/admin/AddCoursePage";
import SignUpPage from "./pages/SignUpPage"

function App() {
  const { state } = useContext(AuthContext);
  // const role = state?.user?.role;
  return (
    <>
      <Router>
        <MenuBarHeader />
        <Routes>
          {/* public */}
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursesPage />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryCoursePage />}
          />
          <Route path="/course/:courseName" element={<CourseDetailPage />} />

          {/* role === std */}
          <Route element={<PrivateRoutes allowedRole="Student" />}>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/course/:courseName/study"
              element={<StudyPage />}
            ></Route>
          </Route>

          {/* role == admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<DashBoardPage />} />
          <Route path="/admin/add-course" element={<AddCoursePage />} />
          <Route element={<PrivateRoutes allowedRole="Admin" />}></Route>
        </Routes>
        <MenuBarFooter />
      </Router>
    </>
  );
}

export default App;
