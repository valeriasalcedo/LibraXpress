import React from 'react';
import Header from '../components/Header'; // Importa el Header
import Sidebar from '../components/Sidebar';
import UserMaintenance from '../components/UserMaintenance';
import Permissions from '../components/Permissions';
import Profiles from '../components/Profiles';
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header en la parte superior */}
      <Header />

      {/* Contenido principal (Sidebar y rutas) */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <div style={{ marginLeft: '20px', flexGrow: 1 }}>
          <Routes>
            <Route path="user-maintenance" element={<UserMaintenance />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="profiles" element={<Profiles />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;