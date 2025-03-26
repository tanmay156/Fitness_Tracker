import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Card, Alert } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Registration successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError("Registration failed");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account? <a href="/">Login</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
