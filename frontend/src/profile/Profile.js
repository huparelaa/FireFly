import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const Navigate = useNavigate();
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json',
    }
  };
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
    return <p>Cargando...</p>;
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
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <section className="hero container w-1/2  ">
                    <img
                      className="rounded-full w-1/3"
                      src="https://cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.webp?size=2048"
                      alt="screenshot"
                      style={{
                        position: 'relative',
                        left: '-300px',
                        top: '-40px'
                      }}
                    />

                  </section>
                </div>
                <div className="text-center mt-12" style={{ position: 'relative', left: '-200px', top: '-200px' }}>
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {usuario.name}
                  </h3>
                  <p
                    className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                    style={{
                      position: "relative",
                      left: "-150px", // Ajusta este valor para cambiar la posición horizontal (izquierda-derecha)
                      top: "-10px" // Ajusta este valor para cambiar la posición vertical (arriba-abajo)
                    }}
                  >
                    {usuario.age} años
                  </p>

                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    style={{
                      marginTop: "-200px",
                      width: "200px",
                      height: "40px",
                      textAlign: "left",
                      marginLeft: "-200px" // Ajusta el valor según sea necesario
                    }}
                    type="submit"
                    onClick={e => { Navigate("/profile/edit") }}
                  >
                    Editar perfil
                  </button>


                </div>

                <button
                  className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  style={{
                    marginTop: "-200px", // Ajusta este valor para subir más el botón
                    width: "200px", // Ajusta este valor para cambiar el ancho del botón
                    height: "40px" // Ajusta este valor para cambiar la altura del botón
                  }}
                  type="submit"
                  onClick={e => { Navigate("/") }}
                >
                  Información
                </button>

                <button
                  className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  style={{
                    marginTop: "-200px", // Ajusta este valor para subir más el botón
                    width: "200px", // Ajusta este valor para cambiar el ancho del botón
                    height: "40px" // Ajusta este valor para cambiar la altura del botón
                  }}
                  type="submit"
                  onClick={e => { Navigate("/") }}
                >
                  Intereses
                </button>

                <button
                  className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  style={{
                    marginTop: "-200px", // Ajusta este valor para subir más el botón
                    width: "200px", // Ajusta este valor para cambiar el ancho del botón
                    height: "40px" // Ajusta este valor para cambiar la altura del botón
                  }}
                  type="submit"
                  onClick={e => { Navigate("/") }}
                >
                  Logros y trofeos
                </button>

                <div className="text-center mt-12">
                  <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Email: {usuario.email}
                  </p>
                </div>
                <div className="text-center mt-12">
                  <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Edad: {usuario.age}
                  </p>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Acerca de mi:
                      </p>
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {usuario.about_me}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Intereses:
                      </p>
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {usuario.intereses}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Logros y Trofeos:
                      </p>
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {usuario.logros_y_trofeos}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
