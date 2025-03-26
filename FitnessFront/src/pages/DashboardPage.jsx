import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import PieChart from "../components/PieChart";
import Navbar from "../components/Navbar";

function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchGoals = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/goals/user/${user.id}`
    );
    setGoals(response.data);
    const total = response.data
      .filter((goal) => goal.completed) 
      .reduce((sum, goal) => sum + goal.caloriesBurned, 0); 
    setTotalCaloriesBurned(total);
  };

  const addGoal = async (goal) => {
    const response = await axios.post("http://localhost:8080/api/goals", {
      ...goal,
      completed: false,
      user,
    });
    setGoals([...goals, response.data]);
  };

  const updateGoal = async (id, completed) => {
    const response = await axios.put(`http://localhost:8080/api/goals/${id}`, {
      completed,
    });
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? response.data : goal
    );
    setGoals(updatedGoals);

    const goal = goals.find((goal) => goal.id === id);

    if (goal) {
      if (completed) {
        setTotalCaloriesBurned((prevTotal) => prevTotal + goal.caloriesBurned);
      } else {
        setTotalCaloriesBurned((prevTotal) => prevTotal - goal.caloriesBurned);
      }
    }
  };

  const deleteGoal = async (id) => {
    const goal = goals.find((goal) => goal.id === id);

    if (goal && goal.completed) {
      setTotalCaloriesBurned((prevTotal) => prevTotal - goal.caloriesBurned);
    }

    await axios.delete(`http://localhost:8080/api/goals/${id}`);
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
  };

  const resetAll = async () => {
    try {
      console.log("Resetting all goals..."); 
      await axios.delete(`http://localhost:8080/api/goals/user/${user.id}`);
      console.log("All goals deleted."); 
      setGoals([]);
      setTotalCaloriesBurned(0);

      console.log("State reset to default."); 
    } catch (error) {
      console.error("Error resetting goals:", error);
    }
  };

  const goalsData = {
    labels: ["Completed Goals", "Remaining Goals"],
    datasets: [
      {
        data: [
          goals.filter((goal) => goal.completed).length, 
          goals.filter((goal) => !goal.completed).length, 
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (

    <Container className="mt-4">
          <Navbar/>
      <h1 className="text-center">Fitness Tracker</h1>
      <p className="text-center">Welcome, {user.username}!</p>
      <Button onClick={fetchGoals} className="mb-3">
        Load Goals
      </Button>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Add Goal</h3>
              <GoalForm addGoal={addGoal} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h3>Goals</h3>
              <GoalList
                goals={goals}
                updateGoal={updateGoal}
                deleteGoal={deleteGoal}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3>Progress Overview</h3>
              <Row>
                <Col md={6}>
                  <PieChart data={goalsData} title="Goals Progress" />
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <h4>Total Calories Burned</h4>
                      <p className="display-4">{totalCaloriesBurned} kcal</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <Button variant="danger" onClick={resetAll}>
          Reset All
        </Button>
      </div>
    </Container>
  );
}

export default DashboardPage;
