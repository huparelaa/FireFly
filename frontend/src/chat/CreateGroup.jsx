import React, { useState, useEffect } from "react";
import axios from "../apiConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateGroup({ setModalIsOpen }) {
  const [roomCreated, setroomCreated] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [filtro, setFiltro] = useState("");
  const [amigos, setAmigos] = useState([]);
  const [personasSeleccionadas, setPersonasSeleccionadas] = useState({});
  const [idRoom, setIdRoom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
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
      setIsLoading(false);
    }
    getFriends();
  }, []);

  async function createRoom(event) {
    event.preventDefault();
    if (!roomName.trim()) {
      Swal.fire({
        title: "Un buen nombre es difícil",
        text: "Tú grupo debe tener algún nombre",
        icon: "error",
      });
      return;
    }
    const selectedPeople = Object.keys(personasSeleccionadas).filter(
      (person) => personasSeleccionadas[person]
    );
    const selectedPeopleInt = selectedPeople.map((idPerson) =>
      parseInt(idPerson)
    );
    if (selectedPeople.length === 0) {
      Swal.fire({
        title: "¿Por qué tan solito?",
        text: "Debes seleccionar al menos un amigo",
        icon: "error",
      });
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/room/`;
    try {
      const response = await axios.post(
        url,
        {
          room_name: roomName,
          members: selectedPeopleInt,
        },
        config
      );
      setIdRoom(response.data.id_room);
      setroomCreated(true);
      //esperamos a que se cargue el id de la Room
    } catch (error) {
      console.error(error);
      return null;
    }
  }

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

  const listaSugerencias =
    amigos.length > 0 ? (
      listaFiltrada.map((persona) => (
        <div
          key={persona}
          className="flex items-center cursor-pointer"
          onClick={() => handleSeleccionarPersona(persona[1])}
        >
          <input
            type="checkbox"
            checked={personasSeleccionadas[persona[1]]}
            onChange={() => handleSeleccionarPersona(persona[1])}
          />
          <span className="text-white pl-6">{persona[0]}</span>
        </div>
      ))
    ) : (
      <div className="text-white">
        Primero agrega amigos para crear una chat-room
      </div>
    );
  if (isLoading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-white text-4xl"
        />
        Cargando lista de amigos...
      </div>
    );
  }
  if (roomCreated) {
    return navigate(`../chatroom/${idRoom}`);
  }

  return (
    <div className="bg-dark-purple rounded-lg w-1/2 p-6">
      <button
        className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
        onClick={() => setModalIsOpen(false)}
      ></button>
      <h2 className="text-lg font-medium mb-4 text-white">Crear grupo</h2>

      <form onSubmit={createRoom}>
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
              autoComplete="off"
            />
            <div></div>
            <label htmlFor="members" className="text-white pr-3">
              Selecciona a tus amigos:
            </label>
            <div className="flex items-center"></div>
            <div className="mt-2">{listaSugerencias}</div>
          </li>
        </ul>
        {amigos && amigos.length > 0 && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
          >
            Crear grupo
          </button>
        )}
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
