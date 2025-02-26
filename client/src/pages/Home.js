import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './home.css';
import bookBackground from '../assets/diseño.jpg'; // Importamos la imagen

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Define navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor ingresa usuario y contraseña.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            // Si el inicio de sesión es exitoso, redirige al usuario
            navigate('/dashboard'); // Usa navigate para redirigir
        } catch (error) {
            console.error('Error en login:', error);
            setError('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div
            className="home-container"
            style={{ backgroundImage: `url(${bookBackground})` }} // Establecemos el fondo en línea
        >
            <div className="text-form-container">
                <div className="title-text">LibraXpress</div>
                <div className="subtext">
                    Una biblioteca moderna diseñada para el almacenamiento y consulta de revistas, tesis y libros. Ofrece un espacio organizado donde estudiantes, investigadores y lectores pueden acceder a una amplia colección de material académico y literario.
                </div>
                <div className="login-form">
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                            />
                        </div>
                        <button type="submit" className="btn-login">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;