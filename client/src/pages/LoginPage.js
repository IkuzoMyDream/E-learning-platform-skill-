import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";

function LoginPage() {
  const handleSubmit = async () => {
    const response = await axios.post();
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="email"></Form.Control>
        <Form.Control type="password"></Form.Control>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
