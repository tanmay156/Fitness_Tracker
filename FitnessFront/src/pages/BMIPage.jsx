import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import Navbar from "../components/Navbar";

function BMIPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight || !height) {
      setError("Please enter both weight and height.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bmi/calculate",
        null,
        {
          params: {
            weight: parseFloat(weight),
            height: parseFloat(height),
          },
        }
      );
      setBMI(response.data.toFixed(2)); 
      setError("");
    } catch (error) {
      setError("Failed to calculate BMI. Please try again.");
      console.error("Error calculating BMI:", error);
    }
  };

  return (
    <Container className="mt-4">
        <Navbar/>
      <Card>
        <Card.Body>
          <h1>BMI Calculator</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight in kilograms"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Height (m)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height in meters"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Calculate BMI
            </Button>
          </Form>
          {bmi !== null && (
            <div className="mt-4">
              <h3>Your BMI: {bmi}</h3>
              <p>
                BMI Categories:
                <ul>
                  <li>Underweight: Less than 18.5</li>
                  <li>Normal weight: 18.5 - 24.9</li>
                  <li>Overweight: 25 - 29.9</li>
                  <li>Obesity: 30 or greater</li>
                </ul>
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BMIPage;
