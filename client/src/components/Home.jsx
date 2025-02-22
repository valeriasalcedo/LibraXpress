import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include"
    })
    .then(() => {
      localStorage.removeItem("user");
      navigate("/login");
    })
    .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  return (
    <div className="home-wrapper">
      <div className="container-home">
        <h1>Welcome, {user?.nombre || "Guest"}!</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;