import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserApi from '../actions/auth'
import Swal from 'sweetalert2'

function Activate() {
  const routeParams = useParams();
  const navigate = useNavigate();
  const verify_account = () => {
    const uid = routeParams.uid;
    const token = routeParams.token;
    UserApi.activateAccount({ uid, token })
    .then(() => {
      Swal.fire({
          timer: 1000,
          timerProgressBar: true,
          icon: 'success',
          title: `Activación de cuenta exitosa`,
          text: ``,
      }).then(() => navigate('/login'));
    }).catch(err => {
      console.log(err)
      Swal.fire({
          timer: 2000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Error',
          text: err.response.data.password,
      })
  });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">¡Verifica tu cuenta!</h1>
        <p className="text-lg mb-8 justify-center">
          Estás a un paso de disfrutar una experiencia inolvidable en FireFly
        </p>
        <button
          className="bg-white text-purple-800 font-bold rounded-md px-4 py-2 cursor-pointer transition hover:bg-purple-600 hover:text-white"
          onClick={verify_account}
        >
          Verificar
        </button>
        <h3 className="text-white mt-4">Continuar redirigirá al inicio</h3>
      </div>
    </>
  );
}

export default Activate;
