import React, { useState, useEffect } from 'react';

const UserMaintenance = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentUserRole, setCurrentUserRole] = useState('');

  // Obtener el rol del usuario actual desde la base de datos
  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuario-actual');
        if (!response.ok) {
          throw new Error('Error al obtener el usuario actual');
        }
        const userData = await response.json();
        setCurrentUserRole(userData.tipo_perfil);
        console.log('Rol del usuario actual:', userData.tipo_perfil); // Verifica el rol
      } catch (error) {
        console.error('Error fetching usuario actual:', error);
      }
    };

    fetchCurrentUserRole();
  }, []);

  // Cargar la lista de usuarios desde la base de datos
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios');
        if (!response.ok) {
          throw new Error('Error al obtener usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Manejar la actualización del tipo de perfil
  const handleUpdatePerfil = async (id, nuevoPerfil) => {
    if (currentUserRole.toLowerCase() !== 'admin') {
      alert('Solo los administradores pueden modificar los perfiles.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipo_perfil: nuevoPerfil }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      // Actualizar la lista de usuarios localmente
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, tipo_perfil: nuevoPerfil } : user
      );
      setUsers(updatedUsers);

      alert('Tipo de perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };

  // Filtrar usuarios según el tipo de perfil
  const filteredUsers = filter === 'all' ? users : users.filter((user) => user.tipo_perfil === filter);

  console.log('Rol del usuario actual en el renderizado:', currentUserRole); // Verifica el rol en el renderizado

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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cédula de Identidad</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ border: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.documento}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <select
                  value={user.tipo_perfil}
                  onChange={(e) => handleUpdatePerfil(user.id, e.target.value)}
                  disabled={currentUserRole.toLowerCase() !== 'admin'} // Deshabilitar si no es admin
                >
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="usuario">Usuario</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserMaintenance;