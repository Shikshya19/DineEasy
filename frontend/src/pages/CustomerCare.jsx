import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function CustomerCareForm() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Customer Care</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message here"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerCareForm;
