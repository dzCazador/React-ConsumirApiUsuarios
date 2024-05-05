import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemUsers from './ItemUsers';
import { UserModal, UserButton } from './UserModal';
import { faUserPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import './GridUsers.css';


function GridUsers (){
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);  

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


  const openModal = (user) => {
    setEditingUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalIsOpen(false);
  };
  const handleItemClick = (userId) => {
    setSelectedUserId(userId.id);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        // Aquí puedes enviar los datos del usuario editado al servidor
        // Por ejemplo:
        // await axios.put(`http://itsmariadb.ddns.net:3001/usuarios/${editingUser.id}`, userData);
        console.log("Datos del usuario editado:", userData);
        // Después de editar el usuario, puedes actualizar la lista de usuarios
        // Por ahora, actualizamos solo localmente
        setUsers(prevUsers => prevUsers.map(user => (user.id === editingUser.id ? userData : user)));
      } else {
        // Aquí puedes enviar los datos del nuevo usuario al servidor
        // Por ejemplo:
        // await axios.post('http://itsmariadb.ddns.net:3001/usuarios', userData);
        console.log("Datos del nuevo usuario:", userData);
        // Después de agregar el usuario, puedes actualizar la lista de usuarios
        // Por ahora, actualizamos solo localmente
        setUsers(prevUsers => [...prevUsers, { id: Math.random(), ...userData }]);
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
    closeModal();
  };

  return (
    <>
    <div className="grid-container">
    <UserButton onClick={() => openModal()} icon={faUserPlus} />
    <UserModal isOpen={modalIsOpen} 
              onRequestClose={closeModal} 
              onSave={handleSaveUser} 
              title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'} 
              user={editingUser} />
    
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
            <ItemUsers 
              key={user.id} 
              user={user} 
              handleItemClick={handleItemClick} // Pasamos la función handleItemClick
              isSelected={selectedUserId === user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default GridUsers;