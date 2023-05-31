import React, { useState, useEffect } from "react";
import axios from "../../apiConnection";

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
    await axios.post(`${process.env.REACT_APP_API_URL}/api/games_selected_recommended/`, { "id": gameId }, config)
    const amigosActualizados = suggestedGames.filter((game) => game["id_game"] !== gameIdP);
    setSuggestedGames(amigosActualizados);
  };
  if (!loading) {
    return (
      <div className="flex w-full items-center justify-center mr-auto" id="contenedor">
        <div className="self-auto flex items-center mr-4">
          <div className="loader"></div>
          <p className="text-white ml-3 font-bold text-base"> Cargando sugerencias... </p>
        </div>
      </div>
    )
  }
  return (
    <div className="text-center">
      <h3 className="text-white mb-4 font-bold mt-5" style={{ fontSize: "1.5em" }}>
        Juegos sugeridos:
      </h3>

      <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 ml-10 mr-10">
        {suggestedGames.map((game) => (
          <div key={game.id_game} className="text-white bg-friend-list w-76 p-3 box-border shadow-md">
            <img src={game.img} className="w-40 h-32 object-cover mx-auto mb-4" alt={game.title} />
            <div className="card-body">
              <h5 className="my-2 truncate">{game.title}</h5>
              <button
                onClick={() => handleSelectGame(game.id_game)}
                className="border rounded-md p-2 hover:bg-info-home bg-login-button shadow-xl"
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>



  );
};

export { SuggestedGames };
