import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "../apiConnection"
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
            <div className="flex w-full items-center justify-end mr-auto" id="contenedor">
                <div className="self-auto flex items-center mr-4">
                    <div className="loader"></div>
                    <p className="text-white ml-3 font-bold"> Cargando perfil... </p> 
                </div>
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
                <p className="text-white"> {usuario.name} {usuario.lastname} </p> 
            </Link>
        </div>

    )
}

export { UserInfo }