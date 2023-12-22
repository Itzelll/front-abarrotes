import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css'; 
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password,
      });
      console.log('Respuesta del backend', response.data);
      if (response.data.success) {
        history.push('/salesReport');
      }            
    } catch (error) {
      console.error('Error al iniciar sesión', error.message);
    }
    console.log(`Usuario: ${username}, Contraseña: ${password}`);
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
        <div className='new-user'><Link to="/">Nueva Cuenta</Link></div>
      </form>
    </div>
  );
};

export default LoginForm;
