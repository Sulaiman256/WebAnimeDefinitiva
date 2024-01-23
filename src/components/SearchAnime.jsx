import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from "axios";

const SearchAnime = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const { data, status } = await axios.get(
        `http://localhost:80/php/search.php?searchTerm=${searchTerm}`
      );

      if (status !== 200 || data.length === 0) {
        setError("No hay resultados para esta busqueda!");
        onSearchResults([]);
        return;
      }
      setError("");
      onSearchResults(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="field has-addons pt-3">
        <div className="control">
          <input
            className="input"
            type="search"
            placeholder="Buscar un Anime"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>

      {/* Mostrar mensaje de error si hay un error */}
      {error && <p className="has-text-danger">{error}</p>}
    </div>
  );
};

export default SearchAnime;
