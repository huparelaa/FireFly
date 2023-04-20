import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FriendList() {
  const [amigos, setAmigos] = useState(null);

  useEffect(() => {
    async function getFriends() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/get_friends/`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
          },
        }
      );
      setAmigos(response.data.friends);
    }
    getFriends();
  }, []);

  if (!amigos) {
    return <p>Cargando amigos...</p>;
  }

  return (
    <div
      className="text-white"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2 className="font-bold">Mis amigos:</h2>
      <ul>
        {amigos.map((friend) => (
          <Link to= {`../profile/${friend[1]}`}>
            <button type="submit">
              <li key={friend[1]}>{friend[0]}</li>
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export { FriendList };
