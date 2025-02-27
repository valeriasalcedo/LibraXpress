import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/dashboard/user-maintenance" className="sidebar-link">
            Mantenimiento de usuarios
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/dashboard/permissions" className="sidebar-link">
            Permisos
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/dashboard/profiles" className="sidebar-link">
            Perfiles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; // Exportación por defecto