import React, { useState } from "react";
import axios from "axios";

const Signup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/php/signup.php",
        {
          nombre: name,
          apellido: lastname,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          console.log("Registro exitoso:", data.success);
          // Puedes manejar la creación de sesión aquí si es necesario
        } else {
          console.error("Error en el registro:", data.error);
        }
      } else {
        console.error("Respuesta no válida del servidor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }

    // Limpiar los campos después de enviar el formulario
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");

    // Cerrar el modal
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Registrarse</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Apellido</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>
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
                  Registrarse
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

export default Signup;
