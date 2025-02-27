import React, { useState } from 'react';
import '../styles/UserMaintenance.css';

function UserMaintenance() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Lisa Mendez', email: 'Lisa02@gmail.com', document: '12345678', role: 'Administrador' },
    { id: 2, name: 'Carlos Perez', email: 'CarlosP@gmail.com', document: '87654321', role: 'Bibliotecario' },
    { id: 3, name: 'Ana Lopez', email: 'AnaL@gmail.com', document: '11223344', role: 'Usuario registrado' },
    { id: 4, name: 'Pedro Ramirez', email: 'PedroR@gmail.com', document: '55667788', role: 'Visitante' },
    { id: 5, name: 'Marta Diaz', email: 'MartaD@gmail.com', document: '99887766', role: 'Administrador' },
    { id: 6, name: 'Sofia Torres', email: 'SofiaT@gmail.com', document: '22334455', role: 'Bibliotecario' }
  ]);

  // Filtrar usuarios por rol y por búsqueda (nombre, email o documento)
  const filteredUsers = users
    .filter(user => activeFilter === 'Todos' || user.role === activeFilter)
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.document.includes(searchTerm) // Permite buscar por documento
    );

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="container">
      <h1>Mantenimiento de Usuarios</h1>

      {/* Contenedor superior para botones de acción, búsqueda y filtrado */}
      <div className="top-section">
        <div className="tab-filter">
          {['Todos', 'Administrador', 'Bibliotecario', 'Usuario registrado', 'Visitante'].map(role => (
            <button
              key={role}
              className={activeFilter === role ? 'tab active' : 'tab'}
              onClick={() => setActiveFilter(role)}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Contenedor de búsqueda y botones de acción alineados a la derecha */}
        <div className="actions-container">
          <input
            type="text"
            placeholder="Buscar por nombre, email o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button className="add-button">Agregar</button>
          <button className="edit-button">Editar</button>
          <button className="delete-button">Eliminar</button>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <table className="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Documento de Identificación</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td><input type="checkbox" /></td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>
                <select 
                  className="profile-dropdown"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Bibliotecario">Bibliotecario</option>
                  <option value="Usuario registrado">Usuario registrado</option>
                  <option value="Visitante">Visitante</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserMaintenance;
