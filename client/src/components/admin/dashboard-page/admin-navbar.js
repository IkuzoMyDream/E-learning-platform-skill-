import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  Image,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../utils/auth/Auth.context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ax from "../../../utils/config/ax";
import conf from "../../../utils/config/main";
import { useLocation } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

export default function AdminNavbar() {
  const { state: ContextState, login, logout } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [searchCourse, setSearchCourse] = useState("");

  let { pathname } = useLocation();
  const isAdminPath = pathname.slice(1, 6) === "admin";
  pathname = pathname.slice(-5);

  const navigate = useNavigate();

  const onSearchCourse = async () => {
    try {
      const response = await ax.get(`${conf.getSearchcourse}${searchCourse}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = state;
    console.log(username, password);
    login(username, password);
    setState({
      username: "",
      password: "",
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/course/${searchCourse}`);
  };

  const onBrandClick = () => {
    navigate("/admin/dashboard2q");
  };

  return (
    <div style={{ position: "flex" }}>
      <div>
        <Navbar
          style={{
            borderBottom: "1px solid rgb(60, 71, 82)",
            background: "#A0BFE0",
            marginBottom: "25px",
            width: "100%",
          }}
          expand="lg"
          // className="z-3 position-fixed"
        >
          <Container>
            <Navbar.Brand onClick={onBrandClick}>
              <Link to="/admin/dashboard">
                <Image src="/logo-skillpp.png" style={{ maxHeight: "60px" }} />
              </Link>
            </Navbar.Brand>
            <Nav>
              <form
                className="form d-flex"
                onSubmit={handleSearch}
                style={{ border: "0.1px solid #a8bce4" }}
              >
                <button type="submit">
                  <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                  >
                    <path
                      d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <input
                  className="input me-2"
                  placeholder="ค้นหารายวิชา"
                  aria-label="Search"
                  type="search"
                  onChange={(e) => setSearchCourse(e.target.value)}
                />
                <button className="reset" type="reset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </form>

              <NavDropdown title="จัดการคอร์ส">
                <NavDropdown.Item onClick={() => navigate("/admin/add-course")}>
                  เพิ่มวิชาเรียน
                </NavDropdown.Item>
                {/* <NavDropdown.Item> */}
                <Link to="https://www.google.com/">
                  <a href="http://localhost:1337/admin/" target="_blank">
                    ลบ/แก้ไขวิชาเรียน
                  </a>
                </Link>
                {/* </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
