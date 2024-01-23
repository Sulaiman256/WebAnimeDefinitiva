import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AnimeDetail from "./components/AnimeDetail";
import { Home } from "./components/views/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
