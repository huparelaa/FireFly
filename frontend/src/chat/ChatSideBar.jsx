import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../apiConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";

import Modal from "react-modal";
import CreateGroup from "./CreateGroup";


function ChatSideBar() {
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroup] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
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

  if (isLoading) {
        return (
          <div className="flex w-1/8 items-center justify-start mr-auto" id="contenedor">
          <div className="self-auto flex items-center mr-4 ml-10">
            <div className="loader"></div>
            <p className="text-white ml-3 font-bold text-base"> Cargando chats recientes... </p>
          </div>
        </div>
    );
  }

  if (!contactos) {
    return <div className="text-white">No has hablado aún con nadie</div>;
  }

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
      <Modal //Ventana emergente
        isOpen={modalIsOpen}
        className="flex justify-center items-center h-screen overflow-auto fixed top-0 left-0 right-0 bottom-0 "
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-90"
        ariaHideApp={false}
      >
        <CreateGroup setModalIsOpen={setModalIsOpen} config={config} />
      </Modal>

      <ul className="flex flex-col bg-dark-purple border-white border-4">
        {contactos.map((contact) => (
          <Link to={`${contact.id}`} key={contact.id}>
            <li className="p-4 border-t border-white hover:bg-purple-500">
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2"
                style={{ color: "#ffffff" }}
              />
              <span className="text-lg font-medium text-white">
                {contact.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <ul className="flex flex-col bg-dark-purple border-white border-4">
        {groups.map((group) => (
          <Link to={`../chatroom/${group.id}`} key={group.id}>
            <li className="p-4 border-t border-white hover:bg-purple-500">
              <span className="text-lg font-medium text-white">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="mr-2"
                  style={{ color: "#ffffff" }}
                />
                {group.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ChatSideBar;