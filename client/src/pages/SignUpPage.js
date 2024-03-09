import React, { useState } from "react";
import { Container, Form, Button ,Modal} from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import ax from "../utils/config/ax.js";
import './CssSignup.css'

function SignUpPage() {
  const [username , setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ax.post("http://localhost:1337/api/users", {
        username, 
        firstname,
        lastname,
        password,
        email,
        role: 4,
      });
      // Navigate to another page upon successful registration
      setShowModal(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
      <Form className="form" onSubmit={handleSubmit}>
        <p className="title_forsinguppagee">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <Form.Group controlId="formusername">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
        </div>
        <div className="flex">
          <Form.Group controlId="formFirstName">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Form.Group>
        </div>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit">
          Sign up
        </Button>
        <p className="signin">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        {/* Modal to show success message */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been successfully created.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            setShowModal(false);
            navigate("/login");
          }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </Container>
  );
}

export default SignUpPage;
