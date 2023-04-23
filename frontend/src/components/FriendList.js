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
    <div className="text-white w-full h-full flex flex-col bg-friend-list rounded-3xl shadow-sm" >
      <h2 className="font-bold ml-5 mt-5 botto">Mis amigos:</h2>
      <ul className="flex flex-col m-2">
        {amigos.map((friend) => (
          <Link to= {`../profile/${friend[1]}`} key={friend[1]} >
              <li className="m-2 h-8 flex items-center hover:bg-light-white rounded-md p-2">
                <img
                    alt="..."
                    className="rounded-full align-middle border-none shadow-lg w-7 h-7 mr-3"
                    src={"https://images-ext-1.discordapp.net/external/HAsgIuwHoE50N1mJaV6a-9BsPH458Yee1ORJikX25oQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.png?width=578&height=578"}
                /> 
                {friend[0]}
              </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export { FriendList };
