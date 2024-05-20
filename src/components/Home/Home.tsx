import React from 'react';
import styles from './Home.module.css';

interface User {
  name: string;
  email: string;
  nickname: string;
  // Añadir otros campos necesarios
}

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Nickname: {user.nickname}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
