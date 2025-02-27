import React, { useState } from "react";
import "../styles/Permissions.css";

const userRoles = ["Administrador", "Bibliotecario", "Usuario registrado", "Visitante"];

const permissionsData = {
  Administrador: {
    "Acceso al sitio": true,
    "Crear libros": true,
    "Editar libros": true,
    "Crear usuarios": false,
    "Eliminar usuarios": false,
    "Gestionar préstamos": true,
  },
  Bibliotecario: {
    "Acceso al sitio": true,
    "Crear libros": true,
    "Editar libros": true,
    "Crear usuarios": false,
    "Eliminar usuarios": false,
    "Gestionar préstamos": true,
  },
  "Usuario registrado": {
    "Acceso al sitio": true,
    "Crear libros": false,
    "Editar libros": false,
    "Crear usuarios": false,
    "Eliminar usuarios": false,
    "Gestionar préstamos": false,
  },
  Visitante: {
    "Acceso al sitio": false,
    "Crear libros": false,
    "Editar libros": false,
    "Crear usuarios": false,
    "Eliminar usuarios": false,
    "Gestionar préstamos": false,
  },
};

const Permissions = () => {
  const [selectedRole, setSelectedRole] = useState("Administrador");
  const [permissions, setPermissions] = useState(permissionsData);

  const handlePermissionChange = (action, value) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [action]: value === "Permitido",
      },
    }));
  };

  return (
    <div className="permissions-wrapper">
     
      <div className="permissions-container">
        <aside className="permissions-sidebar">
          {userRoles.map((role) => (
            <button
              key={role}
              className={role === selectedRole ? "active" : ""}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </aside>
        
        <div className="permissions-table">
          <table>
            <thead>
              <tr>
                <th>Acción</th>
                <th>Configuración</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(permissions[selectedRole]).map(([action, allowed]) => (
                <tr key={action}>
                  <td>{action}</td>
                  <td>
                    <select
                      value={allowed ? "Permitido" : "Denegado"}
                      onChange={(e) => handlePermissionChange(action, e.target.value)}
                    >
                      <option value="Permitido">Permitido</option>
                      <option value="Denegado">Denegado</option>
                    </select>
                  </td>
                  <td className={allowed ? "allowed" : "denied"}>{allowed ? "Permitido" : "Denegado"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
