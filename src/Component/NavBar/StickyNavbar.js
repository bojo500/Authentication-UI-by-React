import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StickyNavbar.css';

function StickyNavbar({ onToggleTheme, isDarkMode }) {
    return (
        <Navbar bg={isDarkMode ? "dark" : "light"} variant={isDarkMode ? "dark" : "light"} sticky="top" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <img
                    src={`${process.env.PUBLIC_URL}/auth.svg`}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="MyApp logo"
                />
                {' '}
                MyApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                    <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
                </Nav>
                <Button className='dark-mood'
                        variant={isDarkMode ? "outline-light" : "outline-dark"}
                        onClick={onToggleTheme}
                >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default StickyNavbar;
