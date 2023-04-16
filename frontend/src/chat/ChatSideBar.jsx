import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactStars from "react-rating-stars-component";

function ChatSideBar() {
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const MySwal = withReactContent(Swal)
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

  const showReviewDialog = () => {
    MySwal.fire({
      title: 'Danos tu opinión aquí ',
      html:
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <ReactStars
            size={50}
            isHalf={true}
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
          />

          <textarea className="swal2-textarea" placeholder="..." id="review"></textarea>
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
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      }
    };
    axios.post(`${process.env.REACT_APP_API_URL}/api/review/id/`, { rating, review }, config)
      .then(response => {
        Swal.fire({
          title: 'Gracias!',
          text: 'Su retroalimentacion se se envio de forma exitosa',
          icon: 'success'
        });
        setRating(0);
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
    <div className="flex flex-col h-screen w-1/4  ">
      <div className="bg-dark-purple text-white text-lg font-bold p-4 border-white border text-center">
        CHATS RECIENTES
        <button onClick={showReviewDialog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Califica tu experiencia!
        </button>
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
