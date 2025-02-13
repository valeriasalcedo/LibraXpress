import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [autenticado, setAutenticado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        setAutenticado(!!token); // Si hay token, está autenticado
    }, [localStorage.getItem('jwt-token')]); // Escuchar cambios en el token

    return (
        <nav className="navbar">
            {!autenticado ? (
                <>
                    <Link to="/acceso">Acceso</Link>
                    <Link to="/registro">Registro</Link>
                </>
            ) : (
                <>
                    <Link to="/home">Inicio</Link>
                    <Link to="/salir">Salir</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
