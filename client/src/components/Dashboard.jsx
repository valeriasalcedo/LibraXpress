import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flexGrow: 1, marginTop: '60px' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 
