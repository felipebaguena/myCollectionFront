import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './Login.module.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
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
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
