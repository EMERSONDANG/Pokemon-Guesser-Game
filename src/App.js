import './App.css';
import React, { useState, useEffect } from "react";
import PokemonQuiz from './pokemonQuiz';
import PokemonHistory from './pokemonHistory';
import { rendering, returnRenderHistory } from "./model.js"

function App() {
  // use a hook and a callback to switch between screens
  const [showHistory, setHistory] = useState(false);
  const toggleHistory = () => setHistory(cur => !cur);

  return (
    <div className="App">
      <button className="show-button" onClick={toggleHistory}> - </button>
      <PokemonQuiz /> 

      {showHistory && <PokemonHistory onClose={toggleHistory}/>}
    </div>
  );
}

export default App;
