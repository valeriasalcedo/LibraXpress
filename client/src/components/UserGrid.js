import React, { useState, useEffect } from 'react';

const UserGrid = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cédula de Identidad</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tipo de Perfil</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ border: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.documento}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.tipo_perfil}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserGrid;