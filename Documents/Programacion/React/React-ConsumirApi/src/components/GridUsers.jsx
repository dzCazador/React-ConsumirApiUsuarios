import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemUsers from './ItemUsers';
import './GridUsers.css';


const GridUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://itsmariadb.ddns.net:3001/usuarios');
        setUsers(response.data.lista);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <ItemUsers key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridUsers;