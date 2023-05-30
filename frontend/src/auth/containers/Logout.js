import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from '../actions/auth'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
function Logout(){
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { 
        res_logout()
    }, [])  
    
    const res_logout = async () => {
        try { 
            await UserApi.logout();
            setIsLoading(false)
        }
        catch (err){ 
            console.error('Logout malo');
        }
    }
    if (!isLoading) {
            localStorage.setItem('access', '');
            localStorage.setItem('refreshToken', '');
            Swal.fire({
                timer: 1000,
                timerProgressBar: true,
                icon: 'success',
                title: `Sesión cerrada`,
                text: `Fue un placer verte en FireFly. ¡Te esperamos de nuevo!`,
            })
            return navigate("/")
        } 
    return (
    <div className="flex w-screen items-center justify-center h-screen" id="contenedor">
        <div className="flex flex-col">
            <div className="loaderChatSide" id="loaderChatSide"> 
            </div>
            <h1 className="text-white font-bold"> Cerrando sesión...</h1> 
        </div>
    </div>
    );
}

export default Logout