import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container-login">
        <div className="heading-login">Log In</div>
        {error && <p className="error-message">{error}</p>}
        <form className="form-login" onSubmit={handleLogin}>
          <input required className="input-login" type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required className="input-login" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="login-button" type="submit" value="Login" />
        </form>
        <span className="signUp"><a onClick={() => navigate("/register")}>Don't have an account? Sign up</a></span>
      </div>
    </div>
  );
};

export default Login;