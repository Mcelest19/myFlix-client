import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [query, setQuery] = useState("");

    useEffect(() => {
        onSearch(query);
    }, [query]);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>              
            )}
            </Nav>
            {user && (
              <Form className="d-flex">
                  <Form.Control
                      style={{color: "black"}}
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      value={query}                      
                      onChange={e => {
                          setQuery(e.target.value);
                      }}
                  />
                  <Link to={"/"}>
                      <Button variant="primary" onClick={() => {
                          onSearch(query);                          
                      }}>Search</Button>
                  </Link>
              </Form> 
              )}         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};