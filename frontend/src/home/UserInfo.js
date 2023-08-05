import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "../apiConnectionLanding"
import ProfileIcon from '../assets/profileicon.jpg'

function UserInfo() {
    const [usuario, setUsuario] = useState(null);
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    useEffect(() => {
        async function getPhotoName() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_name_photo/`, config)
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
        return (
            <div className="flex w-full items-center justify-end mr-10" id="contenedor">
                <div className="loaderPerfil" id="loaderPerfil"> </div>
                <p className="text-white"> Cargando perfil... </p> 
            </div>
        )
    }
    return (
        <div className="flex w-full items-center justify-end mr-5">
            <span className="w-10 h-12 mr-5 flex items-center rounded-full">
                <img
                    alt="..."
                    className="rounded-full align-middle border-none shadow-lg"
                    src={usuario.photo?`${process.env.REACT_APP_API_URL}${usuario.photo}`:ProfileIcon}
                />
            </span>
            <Link to="/profile">
                <p className="text-white"> {usuario.name} </p> 
            </Link>
        </div>

    )
}

export { UserInfo }