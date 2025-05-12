import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import TechFlickLogo from './TechFlickLogo';

const NavBar = ({ isSignedIn }) => {
    const [search, setSearch] = useState('');

    return (
        <Navbar expand="md" bg="light" variant="whaite" className="py-2" sticky="top">
            <Container fluid>
                <Navbar.Brand href="/">
                    <TechFlickLogo className="w-8 h-8" color="#0d6efd" /><span className='ms-2'>TechFlick</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {/* Center Search */}
                    <Form className="d-flex mx-auto w-50">
                        <Form.Control
                            type="search"
                            placeholder="Search for your product!"
                            className="me-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    {/* Right side links */}
                    <Nav className="ms-auto">
                        <NavDropdown
                            title="Products"
                            id="products-nav-dropdown"
                            className="mx-auto mx-md-0"
                        >
                            <NavDropdown.Item href="#">Laptops <i className="bi bi-laptop"></i></NavDropdown.Item>
                            <NavDropdown.Item href="#">Smartphones <i className="bi bi-phone"></i></NavDropdown.Item>
                            <NavDropdown.Item href="#">Wearables <i className="bi bi-smartwatch"></i></NavDropdown.Item>
                            <NavDropdown.Item href="#">Accessories <i className="bi bi-earbuds"></i></NavDropdown.Item>
                            <NavDropdown.Item href="#">Gaming <i className="bi bi-controller"></i></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">Offers</Nav.Link>
                        {isSignedIn && <Nav.Link href="#">My Cart<i class="bi bi-cart"></i></Nav.Link>}
                        {!isSignedIn && <Nav.Link href="#">Sign In</Nav.Link>}
                        {isSignedIn && <Nav.Link href="#">Sign Out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
