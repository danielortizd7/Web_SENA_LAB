import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png';


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const credencialesValidas = {
    usuario: 'admin',
    password: '12345',
  };

  const handleUsuarioChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setUsuario(value);
      setErrorUsuario('');
    } else {
      setErrorUsuario('Solo se permite texto.');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!usuario) {
      setErrorUsuario('El campo "Usuario" es obligatorio.');
      isValid = false;
    }

    if (!password) {
      setErrorPassword('El campo "Contraseña" es obligatorio.');
      isValid = false;
    }

    if (isValid) {
      if (
        usuario === credencialesValidas.usuario &&
        password === credencialesValidas.password
      ) {
        console.log('Inicio de sesión exitoso:', { usuario });
        setErrorLogin('');
        alert('¡Inicio de sesión exitoso!');
      } else {
        setErrorLogin('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="contenedor-login">
      <div className="caja-login">
        <div className="logo">
          <img src={logo} alt="Logo del laboratorio" />
        </div>
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="grupo-input">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={handleUsuarioChange}
            />
            {errorUsuario && <p className="error">{errorUsuario}</p>}
          </div>
          <div className="grupo-input">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
            {errorPassword && <p className="error">{errorPassword}</p>}
          </div>
          {errorLogin && <p className="error error-login">{errorLogin}</p>}
          <button type="submit" className="boton-iniciar">
            Iniciar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
