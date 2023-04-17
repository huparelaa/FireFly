import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


import Modal from "react-modal";

const addMember = async (roomName, members) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const url = `${process.env.REACT_APP_API_URL}/api/room/`;

  try {
    const response = await axios.post(url, {
      room_name: roomName,
      members: members,
    }, config);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function ChatSideBar() {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroup] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [members, setMembers] = useState([]);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  useEffect(() => {
    async function getContacts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/contacts/`,
          config
        );
        setContactos(response.data.contacts);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/room_contacts/`,
          config
        );
        setGroup(res.data.chat_rooms);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getContacts();
  }, []);

  // useEffect(() => {
  //   async function addMemberForm() {
  //     try {
  //       addMember()
        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getContacts();
  // }, []);

  if (isLoading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-white text-4xl"
        />
        Cargando contactos recientes...
      </div>
    );
  }

  if (!contactos) {
    return <div className="text-white">No has hablado aún con nadie</div>;
  }

  const handleAddMember = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col h-screen w-1/4  ">
      <div className="bg-dark-purple text-white text-lg font-bold p-4 border-white border text-center">
        <div> CHATS RECIENTES</div>
        <button
          className="bg-green-600 rounded-lg p-1"
          onClick={() => setModalIsOpen(true)}
        >
          Create group
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex justify-center items-center h-screen overflow-auto fixed top-0 left-0 right-0 bottom-0 "
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-90"
      >
        <div className="bg-dark-purple rounded-lg w-1/2 p-6">
          <button
            className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
            onClick={() => setModalIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="text-lg font-medium mb-4 text-white">Crear grupo</h2>
          <form onSubmit={handleAddMember}>
            <ul>
              <li>
              <label for="room_name" className="text-white pr-3">Nombre del grupo:</label>
              <input type="text" id="room_name" onChange={(event) => setRoomName(event.target.value)} className="pl-1 border border-black"/>
              <label for="members" className="text-white pr-3">Miembros</label>
              <input type="" />
              </li>
            </ul>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
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
      </Modal>

      <ul className="flex flex-col bg-dark-purple border-white border-4">
        {contactos.map((contact) => (
          <Link to={`${contact.id}`} key={contact.id}>
            <li className="p-4 border-t border-white hover:bg-purple-500">
              <FontAwesomeIcon icon={faUser} className="mr-2" style={{color: "#ffffff",}}/>
              <span className="text-lg font-medium text-white">
                {contact.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <ul className="flex flex-col bg-dark-purple border-white border-4">
        {groups.map((group) => (
          <Link to={`${group.id}`} key={group.id}>
            <li className="p-4 border-t border-white hover:bg-purple-500">
              <span className="text-lg font-medium text-white">
              <FontAwesomeIcon icon={faUsers} className="mr-2" style={{color: "#ffffff",}}/>

                {group.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <Link to="/dashboard" className="mt-auto">
        <button className="bg-purple-900 text-white rounded-lg p-3 hover:bg-purple-500 relative bottom-2 left-2">
          Volver
        </button>
      </Link>
    </div>
  );
}

export default ChatSideBar;

