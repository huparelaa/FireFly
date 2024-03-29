import React, { useState, useEffect } from "react";
import axios from "../apiConnection";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ChatRoomContent = () => {
    const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { id } = useParams();
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/room_messages/${id}/`,
          config
        );
        setMessages(response.data.messages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();

    const interval = setInterval(() => {
      getMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!newMessage) {
      return; // Si el mensaje es vacío, no hacemos nada
    }
    try {
      setIsSending(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/room_messenger/${id}/`,
        { message: newMessage },
        config
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
        <div className="flex flex-col">
          <div className="loaderChatSide" id="loaderChatSide"> </div>
          <h1 className="text-white text-lg font-bold"> Cargando mensajes del grupo...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-purple-500 flex items-center justify-between px-4 py-2">
        <Link to={`/chat`} className="mt-auto">
          <button className="text-white hover:text-gray-200 focus:outline-none">
            Volver
          </button>
        </Link>
      </header>

      <ul className="flex flex-col flex-1 overflow-y-scroll border-b-2 border-purple-500 pb-2 p-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`rounded-lg p-2 mx-4 bg-purple-900 ${
              index !== messages.length - 1 ? "mb-2" : ""
            }`}
          >
            <h3 className="font-bold text-white">{message.name}</h3>
            <span className="text-white">{message.content}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <div className="flex p-2">
          <input
            className="flex-1 rounded-l-lg px-2 py-1 mr-2 focus:outline-none"
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button
            className="bg-purple-500 rounded-r-lg px-4 py-1 text-white hover:bg-purple-600 focus:outline-none"
            type="submit"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );

}

export default ChatRoomContent;
