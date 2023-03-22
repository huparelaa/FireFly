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
      async function getPhotoName(){
          await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, config)
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
            height: "60%",
            backgroundImage:
              "url('https://www.xtrafondos.com/wallpapers/control-de-playstation-10819.jpg')",
          }}
        >
        </div>
      </section>
      <main className="profile-page bg-white flex items-center justify-center">
        <section
          className="py-20 w-3/4">
          <div className="container mx-auto px-10">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">

                  <section class="hero container w-1/2  ">
                    <img style={{}} class="mx-auto rounded-full w-1/2" src="https://cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.webp?size=2048" alt="screenshot" />
                  </section>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {usuario.name}
                  </h3>

                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                       {usuario.about_me}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit"
                onClick={e =>{Navigate("/admin")} }
              >
                Editar perfil

              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
