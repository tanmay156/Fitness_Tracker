import React from "react";

function GoalList({ goals, updateGoal, deleteGoal }) {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <span
            style={{
              textDecoration: goal.completed ? "line-through" : "none",
            }}
          >
            {goal.title}
          </span>
          <button onClick={() => updateGoal(goal.id, !goal.completed)}>
            {goal.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => deleteGoal(goal.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default GoalList;
