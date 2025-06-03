// src/components/NavBar.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import TechFlickLogo from './TechFlickLogo';
import { useAuth } from './context/AuthContext';

export default function NavBar() {
  const [search, setSearch] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  // NEW FUNCTION: Handles the search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (search.trim()) { // Only navigate if search term is not empty
      navigate(`/search?query=${encodeURIComponent(search.trim())}`); //
      setSearch(''); // Optionally clear the search bar after searching
    }
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="py-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ zIndex: '2' }}>
          <TechFlickLogo className="w-8 h-8" color="#0d6efd" />
          <span className="ms-2">TechFlick</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Center Search - ADD onSubmit handler */}
          <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}> {/* <--- ADDED THIS */}
            <Form.Control
              type="search"
              placeholder="Search for your product!"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* The button inside a form with type="submit" will trigger onSubmit */}
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>

          <Nav className="ms-auto">
            <NavDropdown
              title="Products"
              id="products-nav-dropdown"
              className="mx-auto mx-md-0"
            >
              <NavDropdown.Item as={Link} to="/category/laptops">
                Laptops
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/smartphones">
                Smartphones
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/smart_watches">
                Smart Watches
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/accessories">
                Accessories
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/gaming_consoles">
                Gaming
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/offers">Offers</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  My Cart
                </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleSignIn} style={{ cursor: 'pointer' }}>
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}