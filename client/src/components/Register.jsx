import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name, email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      navigate("/Login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Register-wrapper">
      <div className="container-Register">
        <div className="heading-Register">Create account</div>
        {error && <p className="error-message">{error}</p>}
        <form className="form-Register" onSubmit={handleRegister}>
          <input required className="input-Register" type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input required className="input-Register" type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required className="input-Register" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="Register-button" type="submit" value="Sign Up" />
        </form>
        <span className="signUp"><a onClick={() => navigate("/login")}>Do you already have an account? Log in.</a></span>
      </div>
    </div>
  );
};

export default Register;
