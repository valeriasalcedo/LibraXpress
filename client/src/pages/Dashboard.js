import React from 'react';
import Sidebar from '../components/Sidebar'; // Ruta relativa correcta
import UserMaintenance from '../components/UserMaintenance'; // Ruta relativa correcta
import Permissions from '../components/Permissions'; // Ruta relativa correcta
import Profiles from '../components/Profiles'; // Ruta relativa correcta
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '20px', flexGrow: 1 }}>
        <Routes>
          <Route path="user-maintenance" element={<UserMaintenance />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="profiles" element={<Profiles />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;