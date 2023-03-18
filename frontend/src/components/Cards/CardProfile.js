import React from "react";

// components

export default function CardProfile() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={"https://cdn.discordapp.com/attachments/280428955394375680/1086763392418725908/dd36c1b817d7c8cf91ca5944a0768c13.png"}
                  className="shadow-xl rounded-full h-auto align-middle border-none relative   max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              David Gonzalez
            </h3>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <h1 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2" >
                  About me
                </h1>
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  Pienso Luego existo socio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
