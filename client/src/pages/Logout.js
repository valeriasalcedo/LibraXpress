import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Eliminar el token de localStorage
        localStorage.removeItem('jwt-token');

        // Redirigir al formulario de acceso después de 3 segundos
        setTimeout(() => {
            navigate('/acceso');
        }, 3000);
    }, [navigate]);

    return (
        <div className="logout-container">
            <h2 className="logout-message">¡Sesión cerrada exitosamente!</h2>
            <p className="logout-subtext">Redirigiéndote al inicio de sesión en 3 segundos...</p>
        </div>
    );
};

export default Logout;
