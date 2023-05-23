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
    <div className=" text-white">
      {recentMatches.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold">Matches Recientes:</h1>
          {recentMatches.map((match) => (
            <Link to = {`../profile/${match[1]}`}>
            <div key={match[1]} className="bg-friend-list mt-3 pl-3 mr-10 rounded-2xl">
              <p>{match[0]}</p>
            </div>
            </Link>
          ))}
        </>
      ) : (
        <h1 className="text-2xl font-bold">No hay matches recientes</h1>
      )}
    </div>
  );
  
  
}
