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
    const gameId = parseInt(gameIdP);
    console.log(gameId);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/games_selected_recommended/`,
        { id: gameId },
        config
      )
      .then(() => {
        // Actualizar la lista de juegos sugeridos
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/analytics/select_more_played_games/`,
            config
          )
          .then((response) => {
            setSuggestedGames(
              suggestedGames.filter((game) => game.id !== gameIdP)
            );
          });
      });
  };
  if (!loading) {
    return <p>Cargando Sugerencias...</p>;
  }
  return (
    <div className="suggested-games-container flex w-80 flex-row">
    <h3 className="text-white text-2xl font-bold mb-4">Juegos sugeridos:</h3>
      <div className="row">
        {suggestedGames.map((game) => (
          <div key={game.id_game} className="col-md-4">
            <div className="card">
              <img src={game.img} className="card-img-top" alt={game.title} />
              <div className="card-body">
                <h5 className="card-title text-white">{game.title}</h5>
                <button
                  onClick={() => handleSelectGame(game.id_game)}
                  className="btn btn-primary text-white"
                >
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
