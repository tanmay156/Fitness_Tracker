import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import "bootstrap/dist/css/bootstrap.min.css";
import BMIPage from "./pages/BMIPage.jsx";
import NutrientPage from "./pages/NutrientPage.jsx";

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} /> {/* Global Toaster */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bmi" element={<BMIPage />} />
        <Route path="/nutrients" element={<NutrientPage/>} />
      </Routes>
    </Router>
  );
}

export default App;