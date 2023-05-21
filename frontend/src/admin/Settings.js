import React, { useState } from 'react'

// components

import CardSettings from "../components/Cards/CardSettings.js";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Settings() {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [intereses, setIntereses] = useState("")
  const [logros_y_trofeos, setLogros_y_trofeos] = useState("")
  const [fotoUsuario, setFotoUsuario] = useState("")
  const [codigoFoto, setCodigoFoto] = useState("")
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
          />
        </div>
      </div>
    </>
  );
}
