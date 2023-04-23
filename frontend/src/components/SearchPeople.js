import React, { useState } from "react";
import axios from 'axios'
import { MdSearch } from 'react-icons/md';

function SearchPeople() {
    const [nombre, setNombre] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    async function handleChange(event) {
        setNombre(event.target.value);
        const res = await axios(`${process.env.REACT_APP_API_URL}/search/?name=${event.target.value}`)
            .then(response => response.data.users)
            .then(data => setUsuarios(data));
    }
    console.log('nombre', nombre)
    console.log('usuarios', usuarios);
    return (
        <div className="bg-dark-bg w-6/12 ml-5 flex items-center justify-center rounded-full shadow-lg">
            <MdSearch className="bg-no-repeat bg-center bg-contain w-5 h-5 mx-1 text-white" />
            <input className="text-white h-14 bg-inherit w-9/12 border-transparent outline-none" type="text" value={nombre} onChange={handleChange} placeholder="Busca en FireFly" />
            {nombre !== "" && (
                <div className="absolute top-16 w-60 bg-white rounded-md shadow-lg z-10">
                    <ul className="flex flex-col max-h-60 overflow-y-auto">
                        {usuarios.slice(0, 8).map((usuario) => (
                            <li key={usuario.id} className="px-4 py-2 hover:bg-gray-100">
                                <a href={`/profile/${usuario.id}/`}> {usuario.name} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export { SearchPeople }
