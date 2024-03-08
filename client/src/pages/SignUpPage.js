import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ax from "../utils/config/ax.js";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ax.post("http://localhost:1337/api/users", {
        username,
        password,
        email,
        role: 4,
      });
      //   navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container>
      <Form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <Form.Group controlId="formFirstName">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
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
          <Form.Control type="password" placeholder="" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit">
          Submit
        </Button>
        <p className="signin">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Form>
    </Container>
  );
}

export default SignUpPage;
