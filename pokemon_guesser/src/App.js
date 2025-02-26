import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon"; // Ensure the correct path
import "./app.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [pokemonLoaded, setPokemonLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRandomPokemon();
  }, []); // Empty array ensures this runs only once when component mounts

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    setPokemon(data);
    setPokemonLoaded(false);

    setTimeout(() => {
      setPokemonLoaded(true);
    }, 100);
  };

  const handleGuess = () => {
    if (!pokemon || userGuess.trim() === "") return;

    if (userGuess.toLowerCase() === pokemon.name.toLowerCase()) {
      setMessage("Correct!");
      setScore(score + 1);
    } else {
      setMessage("Wrong! The Pokémon name was " + pokemon.name);
    }

    setPokemonLoaded(false);
    setTimeout(() => {
      setMessage("");
      setUserGuess("");
      fetchRandomPokemon();
    }, 1000);
  };

  return (
    <div>
      <h1>Who's That Pokémon?</h1>
      {pokemonLoaded && pokemon && (
        <img src={pokemon.sprites?.front_default} alt="Pokémon" />
      )}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Guess</button>
      <p>{message}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default App;
