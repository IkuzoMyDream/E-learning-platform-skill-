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

function App() {
  const { state } = useContext(AuthContext);
  // const role = state?.user?.role;
  return (
    <><body>
      <Router>
        <MenuBarHeader />
        <Routes>
          {/* public */}
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
        </Routes>
      </Router>
      <footer>
       <MenuBarFooter /> 
      </footer>
      </body>
    </>
  );
}

export default App;
