import React, { useState, useEffect } from 'react';

function Pokemon({ pokemon, onGuess }) {
    const [showPokemon, setShowPokemon] = useState(false);

    useEffect(() => {
        if (pokemon) {
            setShowPokemon(false);
            setTimeout(() => setShowPokemon(true), 50);
        }
    }, [pokemon]);

    if (!pokemon) return null;

    return (
        <div>
            <h2>Who's That Pokémon?</h2>
            {showPokemon ? (
                <img src={pokemon.sprites?.front_default} alt="Pokémon" />
            ) : (
                <div style={{ width: 96, height: 96, background: "black" }}></div>
            )}
            <input
                type="text"
                placeholder="Enter Pokémon name"
                onChange={(e) => onGuess(e.target.value)}
            />
        </div>
    );
}

export default Pokemon;
