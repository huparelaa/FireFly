import React from "react";
export default function CardProfile(props) {

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="text-center mt-12">
            <h1 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2" >
              Nombre
            </h1>
            <h3 className="text-xl  leading-normal text-blueGray-700 mb-2">
              {props.nombre}
            </h3>
          </div>
          <div className="text-center mt-12">
            <h1 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2" >
              Edad
            </h1>
            <h3 className="text-xl  leading-normal text-blueGray-700 mb-2">
              {props.edad}
            </h3>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h1 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2" >
                  Acerca de mi
                </h1>
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {props.aboutMe}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}