import './App.css';
import React, { useState, useEffect } from "react";
import PokemonQuiz from './pokemonQuiz';
import PokemonHistory from './pokemonHistory';

function App() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="App">
      <button className="show-button"> - </button>
      <PokemonQuiz /> 
      <PokemonHistory />
    </div>
  );
}

export default App;
