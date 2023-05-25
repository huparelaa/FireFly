import React, { useState, useEffect } from "react";
import axios from "axios";

const SuggestedGames = () => {
  const [loading, setLoading] = useState(false);
  const [suggestedGames, setSuggestedGames] = useState([]);

  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  useEffect(() => {
    const fetchSuggestedGames = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/analytics/select_more_played_games/`,
        config
      );
      setSuggestedGames(response.data.juegos_recomendados);
      setLoading(true);
      console.log(response.data.juegos_recomendados);
    };
    fetchSuggestedGames();
  }, []);

    const handleSelectGame = async (gameIdP) => {
        const gameId = parseInt(gameIdP)
        console.log(gameId);
        await axios.post(`${process.env.REACT_APP_API_URL}/api/games_selected_recommended/`, { "id": gameId }, config )
        const amigosActualizados = suggestedGames.filter((game) => game["id_game"] !== gameIdP);
        setSuggestedGames(amigosActualizados);
        };
    if (!loading) {
      return (
        <div className="flex w-full items-center justify-end mr-10" id="contenedor">
          <div className="loaderSuge" id="loaderSuge"> </div>
          <p className="text-white"> Cargando Sugerencias... </p> 
        </div>
      )
    }
    return (
    <div className="text-center">
        <h3 className='text-white mb-4 font-bold'>Juegos sugeridos:</h3>
            <div className="flex w-full h-40">
                {suggestedGames.map((game) => (
                    <div key={game.id_game} className="col-md-4">
                        <div className="flex flex-col mx-2 text-white bg-friend-list p-3 box-border shadow-md">
                            <img src={game.img} className="w-40 h-32" alt={game.title} />
                            <div className="card-body w-40 rounded-lg">
                            <h5 className="my-4 truncate" >
                                {game.title}
                            </h5>
                                <button onClick={() => handleSelectGame(game.id_game)} className="border rounded-md p-2 hover:bg-dark-purple">
                                    Seleccionar
                                </button>
                            </div>
                          </div>
                    </div>
                ))}
            </div>
    </div>
  );
};

export { SuggestedGames };
