import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-1 pb-3 bg-purple" style={{ marginTop: "-30px" }}>
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
        </div>
        <div className="container mx-auto px-4">
          <hr className="my-0 border-purple-900 bg-dark-purple" />
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <div className="mt-3 lg:mb-0 mb-6">
                <button
                  className="bg-purple-500 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href="https://www.instagram.com/davidgonza0326/" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Logo de Instagram" />
                  </a>
                </button>


                <button
                  className="bg-purple-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href="https://www.instagram.com/jdvalencia_r/" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Logo de Instagram" />
                  </a>
                </button>

                <button
                  className="bg-purple-300 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href="https://www.instagram.com/hobar_upa/" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Logo de Twitter" />
                  </a>
                </button>

                <button
                  className="bg-purple-300 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href="https://github.com/huparelaa/FireFly" target="_blank" rel="noopener noreferrer">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Logo de Twitter" />
                  </a>
                </button>


              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center md:justify-between justify-center" style={{ marginTop: "-48px" }}>
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1" style={{ backgroundImage: "linear-gradient(to bottom, #9F7AEA, #805AD5)", textAlign: "center", borderRadius: "10px", padding: "10px", color: "#ffffff" }}>
                &copy; {new Date().getFullYear()} FireFly. Todos los derechos reservados.
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none ml-2">
                  ⚠️
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer >
    </>
  );
}
