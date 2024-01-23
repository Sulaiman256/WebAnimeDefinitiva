import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogoutClick = () => {
    // Realizar acciones adicionales al cerrar sesión si es necesario
    console.log("Realizar acciones adicionales al cerrar sesión");

    // Llamar a la función de cerrar sesión proporcionada por la prop
    if (typeof onLogout === "function") {
      // Cerrar sesión
      sessionStorage.removeItem("token");
      onLogout();
    }
  };

  return (
    <div>
      <button className="button is-danger" onClick={handleLogoutClick}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;
