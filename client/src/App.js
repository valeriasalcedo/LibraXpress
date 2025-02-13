import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Access from './pages/Access';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Home from './pages/Home';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/acceso" element={<Access />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/salir" element={<Logout />} />
                <Route path="/" element={<Navigate to="/acceso" />} />
            </Routes>
        </Router>
    );
};

export default App;
