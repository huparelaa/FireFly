import React, { useEffect, useState } from "react";
import axios from '../apiConnection'

// components

import CardSettings from "../components/Cards/CardSettings.js";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Settings() {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [intereses, setIntereses] = useState("")
  const [logros_y_trofeos, setLogros_y_trofeos] = useState("")
  const [fotoUsuario, setFotoUsuario] = useState(null)
  const [newFotoUsuario, setNewFotoUsuario] = useState(false)
  const [codigoFoto, setCodigoFoto] = useState("")


  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json',
    }
  };

  useEffect(() => {
    async function getPhotoName() {
      setLoading(true);
      await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
        .then(response => {
          setUsuario(response.data);
          console.log(response.data)
          setNombre(response.data.name || '');
          setEdad(response.data.age || 0);
          setIntereses(response.data.intereses || '');
          setAboutMe(response.data.about_me || '');
          setLogros_y_trofeos(response.data.logros_y_trofeos || '');
          setFotoUsuario(response.data.photo || '');
        })
        .catch(error => {
          console.error(error);
        });
      setLoading(false);
    }
    getPhotoName()
  }, []);

  if (!usuario && loading) {
    return (
      <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
        <div className="flex flex-col">
          <div className="loaderChatSide" id="loaderChatSide"> </div>
          <h1 className="text-white font-bold"> Cargando información del usuario...</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings
            nombre={nombre}
            edad={edad}
            aboutMe={aboutMe}
            intereses={intereses}
            logros_y_trofeos={logros_y_trofeos}
            fotoUsuario={fotoUsuario}
            codigoFoto={codigoFoto}
            setNombre={setNombre}
            setEdad={setEdad}
            setAboutMe={setAboutMe}
            setIntereses={setIntereses}
            setLogros_y_trofeos={setLogros_y_trofeos}
            setFotoUsuario={setFotoUsuario}
            setCodigoFoto={setCodigoFoto}
            setNewFotoUsuario={setNewFotoUsuario}
          />
        </div>
        <div className="w-full lg:w-4/12 px-4 ">
          <CardProfile
            nombre={nombre}
            edad={edad}
            aboutMe={aboutMe}
            intereses={intereses}
            logros_y_trofeos={logros_y_trofeos}
            fotoUsuario={fotoUsuario}
            codigoFoto={codigoFoto}
            newFotoUsuario={newFotoUsuario}
          />
        </div>
      </div>
    </>
  );
}
