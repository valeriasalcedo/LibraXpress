import React, { useState } from 'react';
import './home.css';
import bookBackground from '../assets/book.jpg'; // Importamos la imagen

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setUserData(result.user);
        setError('');
        alert('¡Inicio de sesión exitoso!');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Hubo un error al conectar con el servidor.');
      console.error(error);
    }
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bookBackground})` }} // Establecemos el fondo en línea
    ><div className="text-form-container">
  <div className="title-text">LibraXpress</div>

      <div className="subtext">Una biblioteca moderna diseñada para el almacenamiento y consulta de revistas, tesis y libros. Ofrece un espacio organizado donde estudiantes, investigadores y lectores pueden acceder a una amplia colección de material académico y literario.
      <div className="login-form">
      {error && <div className="error">{error}</div>}
      {userData && (
        <div className="welcome-message">
          <p>Bienvenido, {userData.username}!</p>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USUARIO"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="CONTRASEÑA"
          />
        </div>
        <button type="submit" className="btn-login">Iniciar sesión</button>
      </form>
    </div></div></div></div>
  );
};

export default Home;
