import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbars/AuthNavbar.js";
import { Footer } from "../home/Footer.js"
import { useNavigate } from 'react-router-dom'
import UserInformation from './UserInformation';
import UserIntereses from "./UserIntereses.jsx";
import UserLogros from "./UserLogros.jsx";
import UserGames from "./UserGames.jsx";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [view, setView] = useState({ showInfo: true, showIntereses: false, showLogros: false, showGames: false});
  const Navigate = useNavigate();
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json',
    }
  };
  function showInfo() {
    setView({ ...view, showInfo: true, showIntereses: false, showLogros: false, showGames: false });
  }
  function showIntereses() {
    setView({ ...view, showInfo: false, showIntereses: true, showLogros: false, showGames: false });
  }
  function showLogros() {
    setView({ ...view, showInfo: false, showIntereses: false, showLogros: true, showGames: false });
  }
  function showGames() {
    setView({ ...view, showInfo: false, showIntereses: false, showLogros: false, showGames: true });
  }
  useEffect(() => {
    async function getPhotoName() {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
        .then(response => {
          setUsuario(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    getPhotoName()
  }, []);
  if (!usuario) {
    return (
      <div className="flex w-1/6 items-center justify-end mr-10" id="contenedor">
        <div className="loaderChatSide" id="loaderChatSide"> </div>
        <p className="text-white"> Cargando Perfil de Usuario...</p>
      </div>
    )
  }


  return (
    <>
      <Navbar transparent />
      <section className="block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            height: "55%",
            backgroundImage:
              "url('https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg')",
          }}
        >
        </div>
      </section>
      <main className="profile-page bg-dark-purple flex items-center justify-center">
        <section
          className="py-80 w-full">
          <div className="container mx-auto px-10">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg ">
              <div className="px-6">
                <div className="container ">
                  <div className="flex flex-wrap">
                    <section className="w-1/6">
                      <img
                        className="rounded-full w-full object-contain"
                        src="https://cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.webp?size=2048"
                        alt="screenshot"
                      />
                    </section>

                    <div className="text-center  w-64 h-64 flex justify-center items-center">
                      <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                          {usuario.name}
                        </h3>
                        <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">
                          {usuario.age} años
                        </p>
                        <button
                          className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          onClick={(e) => {
                            Navigate("/profile/edit");
                          }}
                        >
                          Editar perfil
                        </button>
                      </div>
                    </div>

                  </div>


                </div>

                <div className="flex flex-row items-center mt-8 ">
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={showInfo}
                  >
                    Información
                  </button>

                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={showIntereses}
                  >
                    Intereses
                  </button>

                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={showLogros}
                  >
                    Logros y trofeos
                  </button>
                  
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={showGames}
                  >
                    Juegos Preferidos
                  </button>
                </div>
                <div className="container ">
                  <div>
                    {view.showInfo && <UserInformation usuario={usuario} />}
                  </div>

                  <div>
                    {view.showIntereses && <UserIntereses usuario={usuario} />}
                  </div>

                  <div>
                    {view.showLogros && <UserLogros usuario={usuario} />}
                  </div>

                  <div>
                    {view.showGames && <UserGames usuario={usuario} itsMe={true} id={0}/>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
