import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PreferenceForm() {
    const [games, setGames] = useState([]);
    useEffect(() => {
        async function fetchedGames()  {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/`);
                setGames(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchedGames()
    }, []);
    console.log(games)
    return (
        <form>
            <h2>Choose your game preferences:</h2>
            {games.length > 0 ? (
                games.map((game) => (
                    <div key={game.id}>
                        <input
                            type="checkbox"
                            id={`game-${game.id}`}
                            value={game.id}
                        />
                        <img src={game.poster} />
                        <label htmlFor={`game-${game.id}`}>{game.title}</label>
                    </div>
                ))
            ) : (
                <p>Loading games...</p>
            )}
            <button type="submit">Save Preferences</button>
        </form>
    );
}
export default PreferenceForm;