// useEffect, run code after performing an event
import React, { useState, useEffect } from "react";
import { getRandomPokemon } from "./api";
import "./pokemonQuiz.css"


const PokemonQuiz = () => {
    // array with two elements, [state, function_to_update_state]
    // useState sets the state element in array to whatever specified
    // default initializations
    const [pokemon, setPokemon] = useState(null);
    // options is buttons on screen, pull pokemon from API
    const [options, setOptions] = useState([]);
    // renders captured pokemon that is caught
    const [captured, setCaptured] = useState([]);
    // renders message if user selects correct, wrong or skip
    const [message, setMessage] = useState("");
    // checks if 6 pokemon caught
    const [gameOver, setGameOver] = useState(false);
    // checking if a button was clicked
    const [answerSelected, setAnswer] = useState(false);
    // save current pokemon to history
    const [teamHistory, setTeamHistory] = useState([]);
   


    // run once when a switch of event happens
    // useEffect keeps track of the gameOver state
    useEffect(() => {
        if (!gameOver) {
            loadQuestion();
        }
    }, [gameOver]);

    // save state when finished
    // Fisher-Yates Shuffle
    // Start at end index of array, randomly select index from n-1 elements to swap with
    // want skip in fixed position
    const shuffleOptions = (arr) => {
        for (let i = arr.length - 2; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Math.random() generates random between 0 and 1, floor so we get decimal
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    };

    const loadQuestion = async () => {
        const correctPoke = await getRandomPokemon();
        const wrongPokeOne = await getRandomPokemon();
        const wrongPokeTwo = await getRandomPokemon();

        setPokemon(correctPoke);
        setOptions(
            shuffleOptions([
                correctPoke,
                wrongPokeOne,
                wrongPokeTwo,
                { name: "skip" },
            ])
        );
        setMessage("");
        setAnswer(false);
    };

    const handleAnswer = (choice) => {
        if (answerSelected === true) {
            return;
        }

        setAnswer(true);

        if (choice.name === pokemon.name) {
            const updatedCaptured = captured.concat(pokemon);
            setCaptured(updatedCaptured);
            setMessage("You captured: " + pokemon.name);
        } else if (choice.name === "skip") {
            setMessage("The answer was " + pokemon.name);
        } else {
            setMessage("Wrong answer! Answer was " + pokemon.name);
        }

        // check if 6 pokemon reached
        if (captured.length + 1 === 6) {
            setMessage("Game over! You caught 6 Pokemon!");
            setGameOver(true);
            setTimeout(() => {
                resetGame();
            }, 5000);
        } else {
            setTimeout(() => {
                loadQuestion();
            }, 2000);
        }
    };

    // reset all arrays to empty to restart
    const resetGame = () => {
        setCaptured([]);
        setGameOver(false);
        setMessage("");
        loadQuestion();
    };

    // UI of game
    return (
        <div className="main">
            <h1 style={{textAlign: "center"}}>Pokémon Quiz</h1>

            {pokemon && (
                <div>
                    <h2>Which Pokémon is this?</h2>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        style={{ 
                            width: "150px", 
                            height: "150px", 
                            display: "block",
                            margin: "0 auto"
                        }}
                    />
                    <div className="poke-buttons">
                        {options.map((option) => (
                            <button
                                key={option.name}
                                onClick={() => handleAnswer(option)}
                                disabled={captured.length >= 6}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <h3 style={{textAlign: "center"}}>{message}</h3>

            <h2 style={{textAlign: "center"}}>Captured Pokémon</h2>
            <ul className="capture-list">
                {captured.map((poke) => (
                    <span>{poke.name}<br></br></span>
                ))}
            </ul>
        </div>
    );
};

export default PokemonQuiz;
