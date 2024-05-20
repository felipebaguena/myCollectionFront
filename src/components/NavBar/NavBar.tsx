import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import styles from './NavBar.module.css';

interface NavBarProps {
  onLoginClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={onLoginClick}>Iniciar sesión</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;