import React from "react";
import { Link } from "react-router-dom";

export function CardApp({ ...item }) {
  return (
    <div className="column is-one-quarter" key={item.id}>
      {console.log("Imagen URL:", item.imagen)}
      <Link to={`/anime/${item.id}`}>
        <div className="card" style={{ width: "400px" }}>
          <figure className="image is-4by5">
            <img src={item.imagen} alt={item.nombre} />
          </figure>
        </div>
      </Link>
      <h1 className="has-text-centered pt-2 pr-5">{item.nombre}</h1>
    </div>
  );
}
