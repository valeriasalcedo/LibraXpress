import React, { useState, useEffect } from 'react';

function UserMaintenance() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Apellido</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Documento de Identidad</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} style={{ border: '1px solid #ddd' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.nombre}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.apellido}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.documento}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.perfil}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserMaintenance;