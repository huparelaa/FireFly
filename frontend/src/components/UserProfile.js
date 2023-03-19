import axios from "axios";
import React, { useState, useEffect } from "react";

function UserProfile(){
    const [usuario, setUsuario] = useState(null);
    const config = {
        headers: { 
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    useEffect(() => {
        async function getProfile(){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/`, config)
        .then(response => {
            setUsuario(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        }
        getProfile()
    }, []);
    if (!usuario) {
        return <p>Cargando...</p>;
    }
    return (
        <div>
        <h1>Nombre: {usuario.name} </h1>
        <p>Correo electrónico: {usuario.email}</p>
    </div>
    )
}

export { UserProfile }