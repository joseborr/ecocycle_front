import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Asegúrate de crear este archivo CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Iniciando sesión...', import.meta.env.VITE_API_URL);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/`, { username, password });
      const token = response.data.access;
      
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div>
          <h2 className="login-title">
            Iniciar sesión
          </h2>
        </div>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <div className="input-container">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="input-container">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="login-button"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
