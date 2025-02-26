import React, { useState, useEffect } from 'react';

const UserMaintenance = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [tipoPerfil, setTipoPerfil] = useState('');
  const [filter, setFilter] = useState('all'); // Estado para el filtro

  // Cargar la lista de usuarios desde la base de datos
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const url = searchQuery
          ? `http://localhost:5000/api/usuarios/buscar?query=${searchQuery}`
          : 'http://localhost:5000/api/usuarios';
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, [searchQuery]);

  // Manejar la selección de un usuario
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setTipoPerfil(user.perfil);
  };

  // Actualizar el tipo de perfil
  const handleUpdatePerfil = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ perfil: tipoPerfil }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Actualizar la lista de usuarios localmente
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? { ...u, perfil: tipoPerfil } : u
      );
      setUsers(updatedUsers);
      alert('Tipo de perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };

  // Filtrar usuarios según el tipo de perfil
  const filteredUsers = filter === 'all' ? users : users.filter(user => user.perfil === filter);

  return (
    <div>
      <h2>Mantenimiento de Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <div style={{ marginBottom: '20px' }}>
        <label>Filtrar por perfil: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="admin">Administradores</option>
          <option value="editor">Editores</option>
          <option value="usuario">Usuarios</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Documento de Identidad</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Perfil</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ border: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.documento}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.perfil}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => handleSelectUser(user)}>Modificar Perfil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div style={{ marginTop: '20px' }}>
          <h3>Modificar tipo de perfil para {selectedUser.nombre}</h3>
          <select
            value={tipoPerfil}
            onChange={(e) => setTipoPerfil(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="editor">Editor</option>
            <option value="usuario">Usuario</option>
          </select>
          <button onClick={handleUpdatePerfil}>Actualizar perfil</button>
        </div>
      )}
    </div>
  );
};

export default UserMaintenance;