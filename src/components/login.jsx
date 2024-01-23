import React, { useState } from "react";
import axios from "axios";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function cleanLogin() {
    setEmail("");
    setPassword("");
    onClose();
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await axios.post(
        "http://localhost/php/login.php",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status !== 200) return;
      if (data.success) {
        sessionStorage.setItem("token", data.token);
        console.log("Inicio de sesion exitoso");
      } else {
        setErrorMessage("Credenciales incorrectas");
      }
      console.log(data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage(error.message); // Mostrar el mensaje de error al usuario
    }

    cleanLogin();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Iniciar Sesión</h2>
          {errorMessage && (
            <div className="notification is-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="field">
              <label className="label">Correo Electrónico</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Login;
