import React, { useState } from "react";
import data from "./data.json";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const NutritionPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredData);
  };

  return (
    <Container className="mt-4">
      <Navbar />
      <h2 className="text-center mb-4">Nutrition Search</h2>
      
      <Row className="justify-content-center mb-4">
        <Col md={6} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Enter food name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" className="ms-2" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <Row>
        {results.length > 0 ? (
          results.map((food, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{food.name}</Card.Title>
                  <Card.Text>
                    <strong>Serving Size:</strong> {food.serving_size} <br />
                    <strong>Calories:</strong> {food.calories} <br />
                    <strong>Protein:</strong> {food.protein} <br />
                    <strong>Carbohydrates:</strong> {food.carbohydrate} <br />
                    <strong>Fat:</strong> {food.fat} <br />
                    <strong>Vitamins:</strong> A - {food.vitamin_a}, C - {food.vitamin_c}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No matching results</p>
        )}
      </Row>
    </Container>
  );
};

export default NutritionPage;
