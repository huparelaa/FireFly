import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios"

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
                    console.log(response.data);
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
                <p className="text-white"> Cargando Perfil... </p> 
            </div>
        )
    }
    return (
        <div className="flex w-full items-center justify-end mr-5">
            <span className="w-10 h-12 mr-5 flex items-center rounded-full">
                <img
                    alt="..."
                    className="rounded-full align-middle border-none shadow-lg"
                    src={"https://images-ext-1.discordapp.net/external/HAsgIuwHoE50N1mJaV6a-9BsPH458Yee1ORJikX25oQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.png?width=578&height=578"}
                />
            </span>
            <Link to="/profile">
                <p className="text-white"> {usuario.name} </p> 
            </Link>
        </div>

    )
}

export { UserInfo }