import React, { useState, useEffect } from 'react';
import axios from '../apiConnection';
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
                setGames([...games,...response.data.results])
                console.log(games)
                setPage(page+1)
            } catch (error) {
                console.error(error);
            }
        }
        fetchedGames()
    }, [page]);
    
    useEffect(()=>{
        const handleScroll = (e) =>{
            const scrollHeight = e.target.documentElement.scrollHeight
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
            if(currentHeight+1>= scrollHeight){
                setPage(page+1)
            }
            window.addEventListener("scroll",handleScroll);
            return ()=> window.removeEventListener("scroll",handleScroll)
        }
        
    },[page])
    
    return (
        <div className='flex items-center justify-center flex-col '>
            {redirectToDashboard && <Navigate to='/dashboard'/>}
            <h2 className='mt-5 form-title font-bold text-lg'>Selecciona tus juegos favoritos: </h2>
            
        <form className='form-games mt-5 mb-2 bg-dark-bg' onSubmit={handleSubmit}>
            <div className='container-games mt-3'>
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
            {selectedGames.length<3 && 
            <div>
                <button className='m-2' type="submit mt-6" disabled={true}>Juegos seleccionados: {selectedGames.length}/3</button>
            </div>
            }
            {selectedGames.length>=3 &&
                <button type="submit mt-6" disabled={selectedGames.length<3}>Finalizar selección</button>

            }
            
        </form>
        
    </div>
    );
}
export default PreferenceForm;