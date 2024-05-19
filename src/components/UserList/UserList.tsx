import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from './UserList.module.css';

interface User {
  id: number;
  role_code: string;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data.users);
      } catch (err) {
        setError('Error al obtener la lista de usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.userList}>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>Nombre:</strong> {user.name} {user.surname}</p>
            <p><strong>Nickname:</strong> {user.nickname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role_code}</p>
            <p><strong>Creado:</strong> {new Date(user.created_at).toLocaleString()}</p>
            <p><strong>Actualizado:</strong> {new Date(user.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
