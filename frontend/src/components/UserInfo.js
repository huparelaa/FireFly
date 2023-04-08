import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import axios from "axios"
import UserDropdown from "./Dropdowns/UserDropdown";

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
        return <p className='text-white'> Cargando...</p>;
    }
    return (
        <div>
            <UserDropdown name={usuario.name}/>
        </div>

    )
}

export { UserInfo }