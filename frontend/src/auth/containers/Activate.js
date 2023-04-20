import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

function Activate({ verify }) {
  const routeParams = useParams();
  const [verified, setVerified] = useState(false);
  const verify_account = (e) => {
    const uid = routeParams.uid;
    const token = routeParams.token;
    verify(uid, token);
    setVerified(true);
  };
  if (verified) {
    return <Navigate to="/" />;
  }

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

export default connect(null, { verify })(Activate);
