import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <button onClick={() => navigate('user-maintenance')}>Mantenimiento de usuarios</button>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <button onClick={() => navigate('permissions')}>Permisos</button>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <button onClick={() => navigate('profiles')}>Perfiles</button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;