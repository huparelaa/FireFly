import React, { useState } from "react";
import axios from 'axios'
import { MdOutlinePersonSearch } from 'react-icons/md';

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
        <div className="Barra">
            <MdOutlinePersonSearch className="Icono" />
            <input type="text" value={nombre} onChange={handleChange} placeholder="Buscar Usuarios..." />
            {nombre !== "" && (
                <div className="Espacio">
                    <ul>
                        {usuarios.map((usuario) => (
                            <li key={usuario.id}>
                                <a href={`/profile/${usuario.id}/`}> {usuario.name} - {usuario.age} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export { SearchPeople }
