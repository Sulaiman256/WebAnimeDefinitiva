import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Signup from "./signup";
import Login from "./login";
import Logout from "./logout";

function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en el sessionStorage al montar el componente
    const token = sessionStorage.getItem("token");
    if (token) {
      // Si hay un token, actualizar el estado de autenticación
      setAuthenticated(true);
      console.log(authenticated); // Agregar este log para verificar el estado de autenticación
      navigate("/", { replace: true }); // Resto del código...
    }
  }, [navigate, authenticated]);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    console.log("Mostrar formulario de inicio de sesión");
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    console.log("Mostrar formulario de registro");
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    setAuthenticated(false);
    console.log("Cerrar sesión");
    navigate("/", { replace: true }); // Redireccionar a la página principal al cerrar sesión
  };

  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Web Anime
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">{/* Añade tus enlaces aquí */}</div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {authenticated ? (
                <Logout onLogout={handleLogoutClick} />
              ) : (
                <>
                  <a
                    className="button is-primary"
                    href="#"
                    onClick={handleLoginClick}
                  >
                    Iniciar Sesión
                  </a>
                  <a
                    className="button is-light"
                    href="#"
                    onClick={handleSignupClick}
                  >
                    Registrarse
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </nav>
  );
}

export default Navbar;
