import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import defaultProfile from "../assets/defaultProfile.jpg"

function FriendList() {
  const [amigos, setAmigos] = useState(null);
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  };
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
  
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  }

  const eliminarAmigo = async (amigoId) => {
    // Lógica para eliminar el amigo
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/delete_friends/`, {  "user_id": amigoId } , config)
      const amigosActualizados = amigos.filter((amigo) => amigo[1] !== amigoId);
      setAmigos(amigosActualizados);
      setDropdownOpen(null)
    } catch (error) {
      console.error('Error al eliminar amigo:', error);
    }
  }
  const bloquearAmigo = async (amigoId) => {
    // Lógica para eliminar el amigo
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/block_friends/`, {  "user_id": amigoId } , config)
      setDropdownOpen(null)
    } catch (error) {
        console.error('Error al eliminar amigo:', error);
    }
  }

  if (!amigos) {
    return <p>Cargando amigos...</p>;
  }

  return (
    <div className="text-white w-full h-full flex flex-col bg-friend-list rounded-3xl shadow-sm" >
      <h2 className="font-bold ml-5 mt-5 botto">Mis amigos:</h2>
      <ul className="flex flex-col m-2">
        {amigos.map((friend, index) => (
              <li className="m-2 h-8 flex items-center hover:bg-light-white rounded-md p-2" key={friend[1]}>
                <img
                    alt="..."
                    className="rounded-full align-middle border-none shadow-lg w-7 h-7 mr-3"
                    src={defaultProfile}
                /> 
                {friend[0]}
                <div className="ml-auto relative">
                  <button className="bg-transparent border-0 text-gray-400 hover:text-white focus:outline-none" onClick={() => toggleDropdown(index)}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      <path fillRule="evenodd" d="M2 6a2 2 0 114 0 2 2 0 01-4 0zM14 6a2 2 0 114 0 2 2 0 01-4 0zM2 14a2 2 0 114 0 2 2 0 01-4 0zM14 14a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-10">
                      <Link to={`../profile/${friend[1]}`}><button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Ver perfil</button></Link> 
                      <button className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left" onClick={() => eliminarAmigo(friend[1])}>Eliminar amigo</button>
                    </div>
              )}
                </div>
              </li>
        ))}
      </ul>
    </div>
  );
}

export { FriendList };
