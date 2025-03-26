import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function GoalForm({ addGoal }) {
  const [title, setTitle] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && caloriesBurned.trim()) {
      addGoal({ title, caloriesBurned: parseInt(caloriesBurned) });
      setTitle("");
      setCaloriesBurned("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Goal Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Calories Burned</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter calories burned"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Goal
      </Button>
    </Form>
  );
}

export default GoalForm;
