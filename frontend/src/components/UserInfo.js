import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

import axios from "axios"

function UserInfo(){   
    const [usuario, setUsuario] = useState(null);
    const config = {
        headers: { 
            'Content-type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
        }
    };
    useEffect(() => {
        async function getPhotoName(){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_name_photo`, config)
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
        return <p>Cargando...</p>;
    }
    return (
        <div>
            <Link to="/profile">
                <img src="43224"/> 
                <p>{usuario.name}</p>
            </Link>
        </div>
    )
}

export {UserInfo}