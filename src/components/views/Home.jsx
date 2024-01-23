import React from "react";
import SearchAnime from "../SearchAnime";
import { CardApp } from "../CardApp";

export function Home() {
  // Estado local: 'searchResults' guarda los resultados de búsqueda, inicializado como null
  const [searchResults, setSearchResults] = React.useState(null); // Función para manejar los resultados de la búsqueda y actualizar 'searchResults'

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <SearchAnime onSearchResults={handleSearchResults} />
      {searchResults ? (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <div className="columns is-multiline pt-4">
            {searchResults?.map((item) => (
              <CardApp {...item} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
