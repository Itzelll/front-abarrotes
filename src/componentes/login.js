import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        usuario: username,
        contrasenia: password,
      });
  
      console.log('Respuesta del backend', response.data);
  
      if (response.data.success && response.data.rol) {
        const userRole = response.data; // Almacena todo el objeto de respuesta
        localStorage.setItem('userRole', JSON.stringify(userRole));
        navigate('/ventas', { state: { userRole } });
      } else {
        console.error('La respuesta del servidor no contiene un rol válido.', response.data);
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error.message);
    }
  
    console.log('Usuario: ${username}, Contraseña: ${password}');
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form>
        <label className="label">
          Usuario:
          <input
            className="user"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Contraseña:
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="button" type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;