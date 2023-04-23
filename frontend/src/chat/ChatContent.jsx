import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Rating } from 'react-simple-star-rating'

//Esta clase es muy mejorable usando websockets, pero hay que hacer muchos cambios en el backend.
//Pero no consumiría tantos recursos
const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const MySwal = withReactContent(Swal)
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
          `${process.env.REACT_APP_API_URL}/api/messages/${id}/`,
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
        `${process.env.REACT_APP_API_URL}/api/messenger/${id}/`,
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
    return <div>Cargando mensajes...</div>;
  }

  const showReviewDialog = () => {
    MySwal.fire({
      title: 'Danos tu opinión aquí ',
      html:
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Rating
            onClick={e => localStorage.setItem('rating', e)}
            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
            emptyStyle={{ display: "flex" }}
            fillStyle={{ display: "-webkit-inline-box" }}
            transition
            allowFraction
            showTooltip
          />
          <textarea className="swal2-textarea" placeholder="¿Qué tal te pareció la experiencia con este usuario?" id="review"></textarea>
        </div>
      ,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: submitReview,
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    });
  };


  const submitReview = () => {
    const review = MySwal.getPopup().querySelector('#review').value
    const rating = localStorage.getItem('rating')
    // console.log(MySwal.getPopup().querySelector('#rate').value)
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      }
    };
    const id_person = id
    axios.post(`${process.env.REACT_APP_API_URL}/api/review/`, { rating, review, id_person }, config)
      .then(response => {
        console.log(response.data)
        console.log(response.status)
        // Imprimir el valor de las estrellas y el comentario
        console.log("Valor de las estrellas:", rating);
        console.log("Comentario:", review);

        Swal.fire({
          title: 'Gracias!',
          text: 'Su retroalimentacion se se envio de forma exitosa',
          icon: 'success'
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Oops...',
          text: 'Ocurrio un error al enviar la retroalimentacion',
          icon: 'error'
        });
      });
  };

  return (
    <div className="flex flex-col h-screen ">
      <header className="bg-purple-500 flex items-center justify-between px-4 py-2">
        <Link to={`/chat`} className="mt-auto">
          <button className="bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </button>
        </Link>
        <div>
          <button onClick={showReviewDialog} className="bg-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Califica tu experiencia!
          </button>
        </div>
      </header>

      <ul className="flex flex-col flex-1 overflow-y-scroll border-b-2 border-purple-500 pb-2 p-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`rounded-lg p-2 mx-4 bg-purple-900 ${index !== messages.length - 1 ? "mb-2" : ""
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

};

export default ChatContent;
