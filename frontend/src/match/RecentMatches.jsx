import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
export default function RecentMatches() {
  const [recentMatches, setRecentMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/get_last_matches/`,
          config
        );
        setRecentMatches(response.data.matches); // get the latest three matches
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);
  if(isLoading){
    return (
      <div className="text-white ">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-white text-4xl"
        />
        Cargando matches recientes...
      </div>
    );
  }
  return (
    <div className="bg-friend-list text-white">
      {recentMatches.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold">Matches Recientes:</h1>
          {recentMatches.map((match) => (
            <div key={match.id}>
              {/* Render your match data here */}
              <p>{match[0]}</p>
            </div>
          ))}
        </>
      ) : (
        <h1 className="text-2xl font-bold">No hay matches recientes</h1>
      )}
    </div>
  );
  
  
}
