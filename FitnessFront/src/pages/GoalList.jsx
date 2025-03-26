import React from "react";
import { ListGroup, Button } from "react-bootstrap";

function GoalList({ goals, updateGoal, deleteGoal }) {
  return (
    <ListGroup>
      {goals.map((goal) => (
        <ListGroup.Item
          key={goal.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <span
              style={{
                textDecoration: goal.completed ? "line-through" : "none",
              }}
            >
              {goal.title}
            </span>
            <div className="text-muted">
              Calories Burned: {goal.caloriesBurned}
            </div>
          </div>
          <div>
            <Button
              variant={goal.completed ? "warning" : "success"}
              className="me-2"
              onClick={() => updateGoal(goal.id, !goal.completed)}
            >
              {goal.completed ? "Undo" : "Complete"}
            </Button>
            <Button variant="danger" onClick={() => deleteGoal(goal.id)}>
              Delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default GoalList;
