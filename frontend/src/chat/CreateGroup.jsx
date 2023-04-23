import React, { useState } from "react";
import axios from "axios";
function CreateGroup({ setModalIsOpen,config }) {
//   const [roomName, setRoomName] = useState("");

// //   const personas = 

//   const handleAddMember = async (event) => {
//     event.preventDefault();
//   };
//   const addMembers = async (roomName, members) => {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `JWT ${localStorage.getItem("access")}`,
//         Accept: "application/json",
//       },
//     };
//     const url = `${process.env.REACT_APP_API_URL}/api/room/`;

//     try {
//       const response = await axios.post(
//         url,
//         {
//           room_name: roomName,
//           members: members,
//         },
//         config
//       );

//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const listaFiltrada =
//     filtro === ""
//       ? personas
//       : personas.filter((persona) =>
//           persona.toLowerCase().includes(filtro.toLowerCase())
//         );

//   const listaSugerencias = listaFiltrada.map((persona) => (
//     <div
//       key={persona}
//       className="flex items-center cursor-pointer"
//       onClick={() => handleSeleccionarPersona(persona)}
//     >
//       <span
//         className={`w-full p-2 rounded-md ${
//           personasSeleccionadasLocal[persona] ? "bg-blue-500" : "bg-gray-100"
//         }`}
//       >
//         {persona}
//       </span>
//     </div>
//   ));

  return (<></>
    // <div className="bg-dark-purple rounded-lg w-1/2 p-6">
    //   <button
    //     className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
    //     onClick={() => setModalIsOpen(false)}
    //   ></button>
    //   <h2 className="text-lg font-medium mb-4 text-white">Crear grupo</h2>
    //   <form onSubmit={handleAddMember}>
    //     <ul>
    //       <li>
    //         <label htmlFor="room_name" className="text-white pr-3">
    //           Nombre del grupo:
    //         </label>
    //         <input
    //           type="text"
    //           id="room_name"
    //           onChange={(event) => setRoomName(event.target.value)}
    //           className="pl-1 border border-black"
    //         />
    //         <div></div>
    //         <label htmlFor="members" className="text-white pr-3">
    //           Miembros
    //         </label>
    //         <input type="" />
    //       </li>
    //     </ul>

    //     <button
    //       type="submit"
    //       className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
    //     >
    //       Crear grupo
    //     </button>

    //     <button
    //       type="button"
    //       className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
    //       onClick={() => setModalIsOpen(false)}
    //     >
    //       Cancelar
    //     </button>
    //   </form>
    // </div>
  );
}

export default CreateGroup;
