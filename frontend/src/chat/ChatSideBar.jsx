import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function ChatSideBar() {
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization:
        `JWT ${localStorage.getItem('access')}`,
      Accept: "application/json",
    },
  };
  
  useEffect(() => {
    async function getContacts() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts/`, config);
        setContactos(response.data.contacts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getContacts();
  }, []);
  
  if (isLoading) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin className="text-white text-4xl" />
        Cargando contactos recientes...
      </div>
    );
  }
  
  if (!contactos) {
    return <div className="text-white">No has hablado aún con nadie</div>;
  }
  
  return (
    <div className="flex flex-col h-screen w-1/4  ">
      <div className="bg-dark-purple text-white text-lg font-bold p-4 border-white border text-center">
        CHATS RECIENTES
      </div>
      <ul className="flex flex-col bg-dark-purple border-white border-4">
        {contactos.map((contact) => (
          <Link to={`${contact.id}`} key={contact.id}>
          <li className="p-4 border-t border-white hover:bg-purple-500">
            <span className="text-lg font-medium text-white">{contact.name}</span>
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
