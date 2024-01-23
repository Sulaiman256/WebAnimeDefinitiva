import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";

function AnimeDetail() {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [error, setError] = useState(null);

  // Obtener el parámetro 'id' de la URL usando useParams de react-router-dom
  const { id } = useParams();

  useEffect(() => {
    // Función para obtener detalles del anime
    const fetchAnimeDetails = async () => {
      try {
        const { data, status } = await axios.get(
          `http://localhost:80/php/animedetails.php?id=${id}`
        );

        if (status !== 200) {
          setError("La solicitud no pudo completarse");
          return;
        }

        setAnimeDetails(data);
      } catch (error) {
        setError("Error al obtener detalles del anime");
      }
    };

    // Llamar a la función para obtener detalles cuando el componente se monta
    fetchAnimeDetails();
  }, [id]); // Agregar 'id' como dependencia para que se actualice cuando cambie

  // finalizacion de la primera consulta

  // Inicio de las segunda consulta

  return <div></div>;
}

export default AnimeDetail;
