import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemUsers.css';

function UserModal ({ isOpen, onRequestClose, onSave, title, user }) {
  const [userData, setUserData] = useState(user ? { ...user } : {
    username: '',
    email: '',
    nombre: '',
    apellido: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
    setUserData({
      username: '',
      email: '',
      nombre: '',
      apellido: ''
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title === 'Agregar Usuario' ? 'Agregar Usuario' : 'Editar Usuario'}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          maxHeight: '100%',
          overflow: 'auto',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          border: 'none',
        },
      }}
      contentClassName="custom-modal-content"
    >
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="close-button" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={userData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" value={userData.apellido} onChange={handleChange} />
          </div>
          <div className="button-group">
            <button className="cancel-button" onClick={onRequestClose}>
              Cancelar
            </button>
            <button className="save-button" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const UserButton = ({ onClick, icon }) => {
  return (
    <button className="action-button user-button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export { UserModal, UserButton };
