import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar bg="success" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">Private Chat_Application</Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/login">
            <Button variant="dark" className="me-2">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="dark">Register</Button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}