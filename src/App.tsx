import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import { initializeCsrfToken } from './api/axiosConfig';
import NavBar from './components/NavBar';
import LoginSidebar from './components/LoginSidebar';
import axiosInstance from './api/axiosConfig';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    const initCsrf = async () => {
      await initializeCsrfToken();
    };

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('No se pudo obtener la información del usuario', error);
      }
    };

    initCsrf();
    fetchUser();
  }, []);

  const handleLoginClick = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleLoginSuccess = async () => {
    try {
      const response = await axiosInstance.get('/user');
      setUser(response.data.user);
      setIsLoggedIn(true);
      setShowSidebar(false);
    } catch (error) {
      console.error('Error al obtener la información del usuario después del login', error);
    }
  };

  return (
    <div className="App">
      <NavBar onLoginClick={handleLoginClick} />
      <Home user={user} />
      <LoginSidebar show={showSidebar} handleClose={handleCloseSidebar} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default App;
