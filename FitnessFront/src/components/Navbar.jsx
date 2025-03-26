import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Button, Container,} from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar mb-4">
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/dashboard"
          className="navbar-brand"
        >
          Fitness Tracker
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

          <Nav.Link
              as={Link}
              to="/dashboard"
              className={`nav-link-custom ${
                location.pathname === "/dashboard" ? "active-link" : ""
              }`}
            >
              Goals & Calories
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/bmi"
              className={`nav-link-custom ${
                location.pathname === "/bmi" ? "active-link" : ""
              }`}>
              BMI Calculator
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/nutrients"
              className={`nav-link-custom ${
                location.pathname === "/nutrients" ? "active-link" : ""
              }`}
            >
              Nutrients
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            <Button
              variant="outline-light"
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </Button>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
