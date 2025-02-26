import React from 'react';
import './Sidebar.css'; // Importa los estilos

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Menú</h3>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <a href="/dashboard/user-maintenance" className="sidebar-link">
            Mantenimiento de usuarios
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/dashboard/permissions" className="sidebar-link">
            Permisos
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/dashboard/profiles" className="sidebar-link">
            Perfiles
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;