import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

function PreferenceForm() {
    const [page, setPage] = useState(1);
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
    const handleChange = async (e) => {
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
        const url = `https://api.rawg.io/api/games?key=a6e0d61ecf5b4b66871ef58ce43806cd&page=${page}`
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
    }, [page]);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    return (
        <div className='flex items-center justify-center flex-col '>
            {redirectToDashboard && <Navigate to='/dashboard'/>}
            <h2 className='form-title'>Selecciona tus juegos favoritos</h2>
            <div className=' bg-dark-bg w-3/5 my-8 flex items-center justify-center rounded-full shadow-lg' onChange={handleChange}>
                <MdSearch className="bg-no-repeat bg-center bg-contain w-5 h-5 mx-1 text-white" />
                <input className="text-white h-14 bg-inherit w-9/12 border-transparent outline-none" type="text" placeholder="Busca tus juegos favoritos"/>
            </div>
        <form className='form-games mb-8 bg-dark-bg' onSubmit={handleSubmit}>
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
            <button type="submit mt-6">Continuar</button>
        </form>
        <div className="pagination w-full flex justify-center mt-6 text-white">
            <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className='mr-5 hover:bg-slate-500 cursor-pointer'
            >
                Anterior
            </button>
            <button onClick={() => handlePageChange(page + 1)} className={"hover:bg-slate-500"}>Siguiente</button>
        </div>
    </div>
    );
}
export default PreferenceForm;