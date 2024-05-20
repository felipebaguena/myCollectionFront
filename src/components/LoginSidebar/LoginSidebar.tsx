import React, { useState } from 'react';
import { Offcanvas, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../api/axiosConfig';
import styles from './LoginSidebar.module.css';

interface LoginSidebarProps {
  show: boolean;
  handleClose: () => void;
  onLoginSuccess: () => void;
}

const LoginSidebar: React.FC<LoginSidebarProps> = ({ show, handleClose, onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess();
      handleClose();
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className={styles.sidebar}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Iniciar sesión</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleLogin}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LoginSidebar;