import { useEffect, useState } from "react";
import useLocalState from "../utils/useLocalStorage";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [auth, setAuth] = useLocalState(null, "auth");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = axios.post();
    console.log(username, password);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="email"
          onChange={(e) => setUsername(e.target.value)}
        ></Form.Control>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
