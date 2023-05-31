import React, { useState, useEffect } from "react";
import axios from "../apiConnection";

const UserGames = ({itsMe,id}) => {
  const [loading, setLoading] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  useEffect(() => {
    const fetchFavoriteGames = async () => {

      if(itsMe){
        const response =await axios.get(`${process.env.REACT_APP_API_URL}/api/profile_juegos/`, config);
        setFavoriteGames(response.data.juegos_favoritos);
        setLoading(true);
        return 
      }
      const response =await axios.get(`${process.env.REACT_APP_API_URL}/api/profile_juegos/${id}/`, config);
      setFavoriteGames(response.data.juegos_favoritos);
        setLoading(true);
        return 
    };
    fetchFavoriteGames();
  }, [id]);

  if (!loading) {
    return (
      <div className="flex w-full items-center justify-center mr-auto" id="contenedor">
      <div className="self-auto flex items-center mr-4">
          <div className="loader"></div>
          <p className="text-white ml-3 font-bold"> Cargando juegos favoritos... </p> 
      </div>
  </div>
    )
  }

  return (
    <div className="py-10 border-t border-blueGray-200 text-center">
      <h4 class="text-3xl text-white">Juegos favoritos: </h4> <br/>
      <div className="flex flex-wrap justify-center">
          {favoriteGames.map((game) => (
             <div key={game.id_game} className="col-md-4 m-1">
             <div className="flex flex-col mx-2 text-white bg-friend-list p-3 box-border shadow-md">
                 <img src={game.img} className="w-40 h-32" alt={game.title} />
                 <div className="card-body w-40 rounded-lg">
                 <h5 className="my-4 truncate" >
                     {game.title}
                 </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default UserGames;
