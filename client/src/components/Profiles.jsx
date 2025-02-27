import React, { useState } from 'react';
import '../styles/Profiles.css';

function Profiles() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Perfil de usuario');
  const [description, setDescription] = useState('');

  return (
    <div className="profile-container">
      <p className="instructions">Crea o selecciona los parámetros del rol, luego haz click a guardar</p>
      <div className="profile-box">
        <label>Nombre</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre" 
        />

        <label>Tipo de perfil</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Perfil de usuario">Perfil de usuario</option>
          <option value="Administrador">Administrador</option>
          <option value="Bibliotecario">Bibliotecario</option>
          <option value="Usuario registrado">Usuario registrado</option>
          <option value="Visitante">Visitante</option>
        </select>

        <label>Descripción</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escribe la descripción aquí..."
        />

        <div className="buttons">
          <button className="save">Guardar</button>
          <button className="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
