import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/student/CategoryPage";
import { useContext } from "react";
import { AuthContext } from "./utils/auth/Auth.context";

function App() {
  const { state } = useContext(AuthContext)
  console.log(state)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<CategoryPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
