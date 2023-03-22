import React, { useState } from 'react'

// components

import CardSettings from "../components/Cards/CardSettings.js";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Settings() {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings
            nombre={nombre}
            edad={edad}
            aboutMe={aboutMe}
            setNombre={setNombre}
            setEdad={setEdad}
            setAboutMe={setAboutMe}
          />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile
            nombre={nombre}
            edad={edad}
            aboutMe={aboutMe}
          />
        </div>
      </div>
    </>
  );
}
