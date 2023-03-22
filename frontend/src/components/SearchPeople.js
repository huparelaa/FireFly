import React, {useState} from "react";
import Link from 'react-router-dom'
import axios from 'axios'

function SearchPeople(){
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
        <div>
        <input type="text" value={nombre} onChange={handleChange} />
        {nombre !== "" &&(
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.name} - {usuario.age}
                    </li>
                ))}
            </ul>
        )}
        </div>
    )
}
export { SearchPeople } 