import React, { useState, useEffect } from "react";
import axios from "../apiConnection";
import Swal from "sweetalert2";
import { SideBar } from "../components/SideBar";
import RecentMatches from './RecentMatches'
import defaultProfile from "../assets/defaultProfile.jpg";
import { Link, useNavigate } from "react-router-dom";
import MatchRecomendations from "./MatchRecomendations";

function Match() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [similarUsers, setSimilarUsers] = useState([]);
  
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const handleClick = async () => {
    try {
      setIsButtonPressed(true);
      if (!isLoading) {
        setIsLoading(true);
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/match/`,
        config
      );
      setIsLoading(false);
      setSimilarUsers(response.data.similar_users);
      console.log(response.data.similar_users);
    } catch (error) {
      setIsLoading(false);
      setIsButtonPressed(false);
      console.error(error);
      Swal.fire({
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: `Ocurrió un error al buscar el match`,
      });
    }
  };

  

  const handleCancel = () => {
    setIsLoading(false);
    setIsButtonPressed(false);
    setSimilarUsers([]);
    Swal.fire({
      icon: "info",
      title: "El match ha sido cancelado",
    });
  };

  
  return (
    <div className="flex" style={{ width: "100%", height: "100%" }}>
      <SideBar />
      <div className=" w-screen flex justify-center items-center">
        {!isButtonPressed && !isLoading && (
          <div className="w-80 h-80 rounded-lg flex flex-col justify-center items-center text-center">
            <p className=" text-white font-bold mb-4">
              Oprime el botón para hacer el match
            </p>
            <button
              onClick={handleClick}
              className="botonMatch"
            >
              Match
            </button>
          </div>
        )}
        {isLoading && (
          <div className="w-100 h-100 rounded-lg flex flex-col justify-center items-center">
            <p className="text-white font-bold mb-4">
              Buscando los mejores compañeros de juego para ti...
            </p>
            <button
              onClick={handleCancel}
              className="botoCancelar"
            >
              Cancelar
            </button>
          </div>
        )}
        {isButtonPressed && similarUsers.length > 0 && (
          // PONER LA GRID PARA QUE APAREZCAN SOLO LOS USUARIOS
        <div>
          <MatchRecomendations similarUsers={similarUsers} setSimilarUsers={setSimilarUsers}/>
          <RecentMatches/>

        </div>

        )}
      </div>
    </div>
  );
}
export default Match;
