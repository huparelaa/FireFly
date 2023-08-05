import React, { useEffect, useState } from "react";
import defaultProfile from "../../assets/defaultProfile.jpg"
// components

export default function CardProfile(props) {

  const [selectedImage, setSelectedImage] = useState(defaultProfile);

  useEffect(() => {
    if (props.newFotoUsuario) {
      setSelectedImage(props.fotoUsuario);
    }
  }, [props.newFotoUsuario]);

  useEffect(() => {
    if (props.fotoUsuario) {
      setSelectedImage(`${process.env.REACT_APP_API_URL}${props.fotoUsuario}`)
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-info-home w-full mb-6 shadow-xl rounded-lg mt-0 ml-5">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <h1 className="text-center mt-5 text-3xl font-bold leading-normal text-blueGray-700 mb-2 text-white">
                  Previsualización
                </h1><br/>
                <img
                  alt="..."
                  src={selectedImage}
                  className="shadow-xl rounded-full h-auto align-middle border-none relative   max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <h1 className="text-2xl font-bold leading-normal text-blueGray-700 mb-2 text-white">
              Nombre Completo:
            </h1>
            <h3 className="text-xl leading-normal text-blueGray-700 mb-2 text-white">
              {props.nombre} {props.apellidos}
            </h3>
            <h1 className="text-2xl font-bold leading-normal text-blueGray-700 mb-2 text-white" >
              Edad:
            </h1>
            <h3 className="text-xl  leading-normal text-blueGray-700 mb-2 text-white">
              {props.edad}
            </h3><br/>
          </div>
          <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h1 className=" mt-0 text-2xl font-bold leading-normal text-blueGray-700 mb-2 text-white" >
                  Acerca de mí:
                </h1>
                <p className="mb-0 text-xl leading-relaxed text-blueGray-700 text-white text-left text-justify">
                  {props.aboutMe}
                </p>

              </div>
            </div>
          </div>
          <div className="mt-0 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center w-full">
              <div className="w-full lg:w-9/12 px-4">
                <h1 className="text-2xl font-bold leading-normal mb-2 text-blueGray-700 mb-2 text-white" >
                  Intereses:
                </h1>
                <p className="mb-0 text-xl leading-relaxed text-blueGray-700 text-white text-left text-justify">
                  {props.intereses}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-0 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h1 className="text-2xl font-bold leading-normal mb-2 text-blueGray-700 mb-2 text-white" >
                  Logros y Trofeos:
                </h1>
                <p className="mb-0 text-xl leading-relaxed text-blueGray-700 text-white text-left text-justify">
                  {props.logros_y_trofeos}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}