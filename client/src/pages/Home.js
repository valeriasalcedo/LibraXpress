import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './home.css';
import bookBackground from '../assets/diseño.jpg'; // Importamos la imagen

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Define navigate

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json();
      const user = data.user; // Asume que el backend devuelve el usuario en data.user
  
      // Guardar el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirigir al usuario a la página de mantenimiento
      navigate('/user-maintenance');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
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
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
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