import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function PreferenceForm() {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGames, setSelectedGames] = useState([]);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const config = {
        headers: { 
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleGameSelection = (e) => {
        const gameId = parseInt(e.target.value)
        console.log(gameId, selectedGames);
        setSelectedGames(prevSelectedGames => {
            if (prevSelectedGames.includes(gameId)) {
                return prevSelectedGames.filter(id => id !== gameId);
            } else {
                return [...prevSelectedGames, gameId];
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/games_selected/`, { "id": selectedGames }, config) ;
            console.log(response.data);
            setRedirectToDashboard(true);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const url = `https://api.rawg.io/api/games?key=a6e0d61ecf5b4b66871ef58ce43806cd`
        async function fetchedGames()  {
            try {
                const response = await axios.get(url);
                setGames(response.data.results);
                console.log(response.data.results)
            } catch (error) {
                console.error(error);
            }
        }
        fetchedGames()
    }, []);
    return (
        <>
            {redirectToDashboard && <Navigate to='/dashboard'/>}
        <form className='form-games' onSubmit={handleSubmit}>
            <h2 className='form-title'>Selecciona tus juegos favoritos</h2>
            <div className='form-input__search' onChange={handleChange}>
                <input />
            </div>
            <div className='container-games'>
                {games.length > 0 ? (
                    games
                        .filter((game) =>
                            game.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((game) => (
                            <div className={`card-game ${selectedGames.includes(game.id) ? 'selected' : ''}`} key={game.id}>
                                <label htmlFor={`game-${game.id}`}>
                                    <input
                                        className='hide'
                                        type='checkbox'
                                        id={`game-${game.id}`}
                                        value={game.id}
                                        onChange={handleGameSelection}
                                        checked={selectedGames.includes(game.id)}

                                    />
                                    <img src={game.background_image} alt={game.name} />
                                    <span>{game.name}</span>
                                </label>
                            </div>
                        ))
                ) : (
                    <p>No se encontraron juegos</p>
                )}
            </div>
            <button type="submit">Continuar</button>
        </form>
    </>
    );
}
export default PreferenceForm;