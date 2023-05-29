import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import defaultProfile from "../assets/defaultProfile.jpg";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import celebrationSound from "./Match_sound.mp3";
const MatchRecomendations = ({ similarUsers, setSimilarUsers }) => {
  const [matched, setMatched] = useState(false);
  const { width, height } = useWindowSize();
  const [match, setMatch] = useState("");
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const sound = new Audio(celebrationSound);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  useEffect(() => {
    if (match !== "" && matched) {
      setShowConfetti(true);
      sound.play();
      handleDoMatch();
      setTimeout(() => {
        setShowConfetti(false);
        navigate(`/profile/${match}`);
      }, 5000);
    }
    if (match !== "" && !matched) {
      handleBlockMatch(match);
    }
  }, [match, matched]);
  const handleBlockMatch = async (userId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/block_match/`,
        { user_id: userId },
        config
      );
      // Actualizar similarUsers para excluir el usuario bloqueado
      setSimilarUsers(similarUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoMatch = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/do_match/`,
        { user_id: match },
        config
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (match !== "" && matched) {
      handleDoMatch();
    }
    if (match !== "" && !matched) {
      handleBlockMatch(match); // Pasa match como argumento
    }
  }, [match, matched]); // Agrega matched a las dependencias

  return (
    <div className="flex flex-col text-center items-center ">
      {showConfetti && (
        <div>
          <Confetti width={width} height={height} />
        </div>
      )}
      <h2 className="text-white mb-12 text-3xl font-bold">
        ¡Felicidades! Estos son los usuarios con gustos similares a los tuyos:{" "}
      </h2>
      <div className="w-34 grid grid-cols-3 gap-7 justify-items-center place-items-center">
        {similarUsers.map((user) => (
          <>
            <div className="flex flex-col items-center mb w-72 h-72 py-20 bg-friend-list">
              <img
                alt="..."
                className="rounded-md align-middle border-none bg-cover shadow-lg w-24 h-24 mb-4"
                src={user.photo?`${process.env.REACT_APP_API_URL}${user.photo}`:defaultProfile}
              />
              <p className="text-white">
                {" "}
                {user.name} - Similitud: {Math.round(user.similarity * 100, 0)}
                {"%"}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-button-color-principal hover:bg-button-color-pr-hov text-white p-2 rounded-lg mr-3"
                  onClick={() => {
                    setMatched(true);
                    setMatch(user.id);
                  }}
                >
                  MATCH!
                </button>

                <button
                  className="flex flex-col bg-red-600 hover:bg-red-800 text-white p-2 rounded-lg"
                  onClick={() => {
                    setMatched(false);
                    setMatch(user.id);
                  }}
                >
                  No recomendar
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MatchRecomendations;
