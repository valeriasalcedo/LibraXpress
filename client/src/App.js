import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserMaintenance from './components/UserMaintenance';
import Permissions from './components/Permissions';
import Profiles from './components/Profiles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="user-maintenance" element={<UserMaintenance />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="profiles" element={<Profiles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
