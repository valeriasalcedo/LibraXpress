import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verificarSesion from '../utils/sessionUtils';

const Access = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const isAuthenticated = await verificarSesion();
            if (isAuthenticated) {
                navigate('/home'); // Redirige al Home si ya está autenticado
            }
        };

        checkSession();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/acceso', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Credenciales inválidas');

            const data = await response.json();
            localStorage.setItem('jwt-token', data.token);
            navigate('/home'); // Redirige al Home después del login
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="container">
            <h2>Acceso</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
            {message && <p className="error">{message}</p>}
        </div>
    );
};

export default Access;
