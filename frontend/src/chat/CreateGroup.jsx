import React, { useState, useEffect } from "react";
import axios from "axios";
import {Navigate, Link} from 'react-router-dom'

function CreateGroup({ setModalIsOpen, config }) {
  const [roomName, setRoomName] = useState("");
  const [filtro, setFiltro] = useState("");
  const [amigos, setAmigos] = useState(null);
  const [personasSeleccionadas, setPersonasSeleccionadas] = useState({});
  const [redirectToChatRoom, setRedirectToChatRoom] = useState(false);
  const [idRoom, setIdRoom] = useState("");
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

  const handleAddMember = async (event) => {
    event.prevetnDefault();
    
  };

  async function createRoom (){
    const url = `${process.env.REACT_APP_API_URL}/api/room/`;

    try {
      const response = await axios.post(
        url,
        {
          room_name: roomName,
          members: personasSeleccionadas,
        },
        config
      );
        
      
      setIdRoom(response.data.id_room)
    
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSeleccionarPersona = (nombrePersona) => {
    setPersonasSeleccionadas({
      ...personasSeleccionadas,
      [nombrePersona]: !personasSeleccionadas[nombrePersona],
    });
  };

  const listaFiltrada =
    filtro === ""
      ? amigos
      : amigos.filter((persona) =>
          persona.toLowerCase().includes(filtro.toLowerCase())
        );

  const listaSugerencias = amigos
    ? listaFiltrada.map((persona) => (
        <div
          key={persona}
          className="flex items-center cursor-pointer"
          onClick={() => handleSeleccionarPersona(persona)}
        >
          <input
            type="checkbox"
            checked={personasSeleccionadas[persona]}
            onChange={() => handleSeleccionarPersona(persona)}
          />
          <span className="text-white pl-6">{persona[0]}</span>
        </div>
      ))
    : null;

  return (
    <div className="bg-dark-purple rounded-lg w-1/2 p-6">
      <button
        className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
        onClick={() => setModalIsOpen(false)}
      ></button>
      <h2 className="text-lg font-medium mb-4 text-white">Crear grupo</h2>

      <form onSubmit={handleAddMember}>
        <ul>
          <li>
            <label htmlFor="room_name" className="text-white pr-3">
              Nombre del grupo:
            </label>
            <input
              type="text"
              id="room_name"
              onChange={(event) => setRoomName(event.target.value)}
              className="pl-1 border border-black"
            />
            <div></div>
            <label htmlFor="members" className="text-white pr-3">
              Selecciona a tus amigos:
            </label>
            <div className="flex items-center">
              
            </div>
            <div className="mt-2">{listaSugerencias}</div>
          </li>
        </ul>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={createRoom}
          >
            Crear grupo
          </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
          onClick={() => setModalIsOpen(false)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default CreateGroup;
