import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AuthContext } from "../store/authContext";
import { toast } from "react-toastify";

function CustomerCareForm() {
  const { myAxios } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, message } = e.target;
    myAxios
      .post("/api/message", {
        email: email.value,
        message: message.value,
      })
      .then((res) => {
        toast.success("Message sent successfully");
        e.target.email.value = "";
        e.target.message.value = "";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data.msg || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Customer Care</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                required
                placeholder="Enter your message here"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerCareForm;
