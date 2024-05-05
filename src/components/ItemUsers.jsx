import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './ItemUsers.css';

function ItemUsers ({user, handleItemClick, isSelected })   {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(user.id);
    closeDeleteModal();
  };

  return (
    <tr className={`${isSelected ? 'user-item.selected' : 'user-item'}`} onClick={handleItemClick}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.nombre}</td>
      <td>{user.apellido}</td>
      <td>
        <button className="action-button" onClick={openModal} title="Modificar Usuario">
          <FontAwesomeIcon icon={faEdit} /> 
        </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Usuario"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '450px',
            maxHeight: '100%',
            overflow: 'auto', // Permite desplazar el contenido si es demasiado largo
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra ligera para el modal
            border: 'none', // Quita el borde predeterminado
          },
        }}
        contentClassName="custom-modal-content"
      >
        <div className="modal-header">
          <h2>Editar Usuario</h2>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="edit-username">Usuario:</label>
              <input type="text" id="edit-username" defaultValue={user.username} />
            </div>
            <div className="form-group">
              <label htmlFor="edit-email">Email:</label>
              <input type="email" id="edit-email" defaultValue={user.email} />
            </div>
            <div className="form-group">
              <label htmlFor="edit-name">Nombre:</label>
              <input type="text" id="edit-name" defaultValue={user.nombre} />
            </div>
            <div className="form-group">
              <label htmlFor="edit-lastname">Apellido:</label>
              <input type="text" id="edit-lastname" defaultValue={user.apellido} />
            </div>
            <div className="button-group">
              <button className="cancel-button" onClick={closeModal}>
                Cancelar
              </button>
              <button className="save-button" type="submit">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <button className="action-button" onClick={openDeleteModal} title="Borrar Usuario">
          <FontAwesomeIcon icon={faTrashAlt} />
      </button> 
      <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete User Modal"
          className="modal"
          overlayClassName="overlay"
          style={{
            content: {
              top: '10%',
              left: '20%',
              transform: 'translate(-50%, -50%)',
              width: '300px', // Ajusta el ancho según sea necesario
              maxHeight: '80%',
              overflow: 'auto', // Permite desplazar el contenido si es demasiado largo
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra ligera para el modal
              border: 'none', // Quita el borde predeterminado
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Centra horizontalmente
              justifyContent: 'center', // Centra verticalment
              
            },
          }}>
          <div>
            <h2>Borrado de Usuario</h2>
            <p>Seguro que desea borrar el Usuario?</p>
            <button onClick={handleDelete}>Si</button>
            <button onClick={closeDeleteModal}>No</button>
          </div>
        </Modal>      

      </td>
    </tr>
  );
};

export default ItemUsers;