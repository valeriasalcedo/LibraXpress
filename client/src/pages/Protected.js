import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verificarSesion from '../utils/sessionUtils'; 

const Protected = () => {
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const isAuthenticated = await verificarSesion();
            if (!isAuthenticated) {
                navigate('/acceso'); // Redirigir si no hay sesión activa
            } else {
                setMensaje('Bienvenido a la página protegida');
            }
        };

        checkSession();
    }, [navigate]);

    return <h2>{mensaje}</h2>;
};

export default Protected;
